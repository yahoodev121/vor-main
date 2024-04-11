import { IServiceOptions } from '../IServiceOptions';
import moment from 'moment';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TaskInstanceRepository from '../../database/repositories/taskInstanceRepository';
import TaskInstanceRepositoryEx from '../../database/repositories/extend/taskInstanceRepositoryEx';
import TaskRepositoryEx from '../../database/repositories/extend/taskRepositoryEx';
import TaskRepository from '../../database/repositories/taskRepository';
import ProgramControlRepository from '../../database/repositories/programControlRepository';
import Error400 from '../../errors/Error400';

export default class TasksOnCalendarService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async moreByTaskInstance({ date, page, rpp }) {
    const start = moment(date).toISOString();
    const end = moment(date).add(1, 'days').toISOString();

    const filter = {
      $expr: {
        $and: [
          { $ne: ['$status', 'Complete'] },
          { $ne: ['$repeat', 'Never'] },
          {
            $gte: ['$dueDate', start],
          },
          {
            $lt: ['$dueDate', end],
          },
        ],
      },
    };

    let limit = rpp || 1;
    let offset = (rpp || 1) * ((page || 1) - 1);

    if (offset < 0) {
      offset = 0;
    }

    const result =
      await TaskInstanceRepositoryEx.rawFindAndCountAll(
        {
          filter,
          limit,
          offset,
          orderBy: 'dueDate_DESC',
        },
        this.options,
      );

    const totalPages = Math.ceil(
      (result.count || 1) / limit,
    );

    return {
      tasks: result.rows ?? [],
      totalPages,
    };
  }

  async moreByTask({ date, page, rpp }) {
    const selectedDate = {
      $dateFromString: {
        dateString: moment(date).format('YYYY-MM-DD'),
      },
    };

    const dueDateDiff = (
      unit: 'day' | 'week' | 'month' | 'quarter' | 'year',
    ) => ({
      $dateDiff: {
        startDate: '$dueDate',
        endDate: selectedDate,
        unit: unit,
      },
    });

    const isWeekends = {
      $in: [
        {
          $dateToString: {
            date: selectedDate,
            format: '%w',
          },
        },
        ['1', '7'],
      ],
    };

    const conditions: {
      repeat: string;
      format: null | string;
      additions?: any[];
    }[] = [
      {
        repeat: 'Never',
        format: '%Y-%m-%d',
      },
      {
        repeat: 'Daily',
        format: null,
      },
      {
        repeat: 'Weekdays',
        format: null, // ISO Week Number '%V'
        additions: [
          {
            $not: isWeekends,
          },
        ],
      },
      {
        repeat: 'Weekends',
        format: null, // ISO Week Number '%V'
        additions: [isWeekends],
      },
      {
        repeat: 'Weekly',
        format: '%w',
      },
      {
        repeat: 'Biweekly',
        format: '%w',
        additions: [
          {
            $eq: [
              {
                $mod: [dueDateDiff('week'), 2],
              },
              0,
            ],
          },
        ],
      },
      {
        repeat: 'Monthly',
        format: '%d',
      },
      {
        repeat: 'Every 3 Months',
        format: '%d',
        additions: [
          // {
          //   $gt: [dueDateDiff('month'), 0],
          // },
          {
            $eq: [
              {
                $mod: [dueDateDiff('month'), 3],
              },
              0,
            ],
          },
        ],
      },
      {
        repeat: 'Every 6 Months',
        format: '%d',
        additions: [
          // {
          //   $gt: [dueDateDiff('month'), 0],
          // },
          {
            $eq: [
              {
                $mod: [dueDateDiff('month'), 6],
              },
              0,
            ],
          },
        ],
      },
      {
        repeat: 'Annually',
        format: '%m-%d',
      },
    ];

    const orFilters = conditions.map((cond) => {
      const combinedConditions: any[] = [
        { $eq: ['$repeat', cond.repeat] },
      ];
      if (cond.format) {
        combinedConditions.push({
          $eq: [
            {
              $dateToString: {
                date: '$dueDate',
                format: cond.format,
              },
            },
            {
              $dateToString: {
                date: selectedDate,
                format: cond.format,
              },
            },
          ],
        });
      }
      cond.additions?.forEach((addition) => {
        combinedConditions.push(addition);
      });
      return {
        $and: combinedConditions,
      };
    });

    const filter = {
      $expr: {
        $and: [
          { $ne: ['$status', 'Complete'] },
          // { $ne: ['$repeat', 'Never'] },
          {
            $lte: [
              {
                $dateToString: {
                  date: '$dueDate',
                  format: '%Y-%m-%d',
                },
              },
              {
                $dateToString: {
                  date: selectedDate,
                  format: '%Y-%m-%d',
                },
              },
            ],
          },
          {
            $or: orFilters,
          },
        ],
      },
    };

    let limit = rpp || 1;
    let offset = (rpp || 1) * ((page || 1) - 1);

    if (offset < 0) {
      offset = 0;
    }

    const result =
      await TaskRepositoryEx.rawFindAndCountAll(
        {
          filter,
          limit,
          offset,
          orderBy: 'dueDate_DESC',
        },
        this.options,
      );

    const totalPages = Math.ceil(
      (result.count || 1) / limit,
    );

    return {
      tasks: result.rows ?? [],
      totalPages,
    };
  }

  async search({ start, end, filter }) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      let result;

      if (filter === 'all') {
        result =
          await TaskInstanceRepository.findAndCountAll(
            {
              filter: {
                dueDate: [start, end],
              },
            },
            { ...this.options, session },
          );
      } else {
        const controls =
          await ProgramControlRepository.findAndCountAll(
            { filter: {} },
            { ...this.options, session },
          );

        const uniqueValues = {};

        controls.rows?.forEach((element) => {
          element.tasks?.forEach((val) => {
            if (!uniqueValues[val.id]) {
              uniqueValues[val.id] = true;
            }
          });
        });

        let controlTasks = Object.keys(uniqueValues);

        controlTasks =
          await TaskRepository.filterIdsInTenant(
            controlTasks,
            { ...this.options, session },
          );

        const allTasks = await TaskRepository.findAllIds({
          ...this.options,
          session,
        });

        const nonControlTasks = allTasks.filter(
          (id) =>
            !controlTasks.some(
              (subId) => subId.toString() === id.toString(),
            ),
        );

        if (filter === 'control') {
          result =
            await TaskInstanceRepository.findAndCountAll(
              {
                filter: {
                  dueDate: [start, end],
                  taskIds: controlTasks,
                },
              },
              { ...this.options, session },
            );
        } else if (filter === 'non-control') {
          result =
            await TaskInstanceRepository.findAndCountAll(
              {
                filter: {
                  dueDate: [start, end],
                  taskIds: nonControlTasks,
                },
              },
              { ...this.options, session },
            );
        } else {
          throw new Error400(
            this.options.language,
            'task.errors.wrongFilter',
          );
        }
      }

      return {
        events: [...(result.rows ?? [])],
        currentDate: Date.now(),
      };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'task',
      );

      throw error;
    }
  }

  async move({ id, start }) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    try {
      const newDueDate = moment(start);
      const today = moment();

      if (today.isAfter(newDueDate, 'day')) {
        return false;
      }

      const record = await TaskInstanceRepository.update(
        id,
        {
          dueDate: newDueDate,
        },
        {
          ...this.options,
          session,
        },
      );

      // const record =
      //   await TaskInstanceRepositoryEx.updateMany(
      //     {
      //       task: taskInstance.task._id,
      //       status: {
      //         $ne: 'Complete',
      //       },
      //     },
      //     {
      //       $set: {
      //         dueDate: {
      //           $dateAdd: {
      //             startDate: '$dueDate',
      //             unit: 'day',
      //             amount: duration.asDays(),
      //           },
      //         },
      //       },
      //     },
      //     { ...this.options, session },
      //   );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'task',
      );

      throw error;
    }
  }
}
