import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Client from '../models/client';
import Error400 from '../../errors/Error400';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import ProgramControl from '../models/programControl';
import ProgramRepository from './programRepository';
import Project from '../models/project';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import TaskInstanceRepositoryEx from './extend/taskInstanceRepositoryEx';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

class TaskRepository {
  static ALL_FIELDS = [
    'reference',
    'title',
    'taskList',
    'description',
    'notes',
    'priority',
    'repeat',
    'status',
    'owner',
    'approver',
    'newsArticles',
    'products',
    'policyTemplates',
    'policies',
    'dueDate',
    'completedDate',
    'attachments',
  ];

  static async _updateRelationships(
    data,
    options: IRepositoryOptions,
  ) {
    const models = {
      projects: Project,
    };
    for (const sourceAttr of Object.keys(models)) {
      await MongooseRepository.refreshTwoWayRelationManyToMany(
        data,
        sourceAttr,
        models[sourceAttr](options.database),
        'tasks',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Task(options.database).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._updateRelationships(
      { _id: record._id, ...data },
      options,
    );

    await FileRepository.assignRelatedData(
      data.attachments,
      {
        type: FileRepository.TYPE_TASK,
        typeId: record.id,
        typeTitle: record.title,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await ProgramRepository.updateStatusFromTask(
      record.id,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Task(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Task(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._updateRelationships(
      { _id: record._id, ...data },
      options,
    );

    await FileRepository.assignRelatedData(
      data.attachments,
      {
        type: FileRepository.TYPE_TASK,
        typeId: record.id,
        typeTitle: record.title,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    await ProgramRepository.updateStatusFromTask(
      record.id,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Task(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    let clients =
      await MongooseRepository.wrapWithSessionIfExists(
        Client(options.database).countDocuments({
          tasks: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (clients) {
      throw new Error400(
        currentTenant.language,
        'errors.inUse.message',
        record.reference,
      );
    }

    let vendors =
      await MongooseRepository.wrapWithSessionIfExists(
        Vendor(options.database).countDocuments({
          tasks: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (vendors) {
      throw new Error400(
        currentTenant.language,
        'errors.inUse.message',
        record.reference,
      );
    }

    let risks =
      await MongooseRepository.wrapWithSessionIfExists(
        Risk(options.database).countDocuments({
          tasks: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (risks) {
      throw new Error400(
        currentTenant.language,
        'errors.inUse.message',
        record.reference,
      );
    }

    let programControls =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramControl(options.database).countDocuments({
          tasks: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (programControls) {
      throw new Error400(
        currentTenant.language,
        'errors.inUse.message',
        record.reference,
      );
    }

    // let projects =
    //   await MongooseRepository.wrapWithSessionIfExists(
    //     ProgramControl(options.database).countDocuments({
    //       tasks: id,
    //       tenant: currentTenant.id,
    //     }),
    //     options,
    //   );

    // if (projects) {
    //   throw new Error400(
    //     currentTenant.language,
    //     'errors.inUse.message',
    //     record.reference,
    //   );
    // }

    await Task(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    for (const model of [
      Vendor,
      Risk,
      ProgramControl,
      Project,
    ]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        model(options.database),
        'tasks',
        options,
      );
    }

    await MongooseRepository.destroyRelationToOne(
      id,
      TaskInstance(options.database),
      'task',
      options,
    );

    await TaskInstanceRepositoryEx.destroyMany(
      {
        task: null,
      },
      options,
    );

    await FileRepository.releaseRelatedData(
      { type: FileRepository.TYPE_TASK, typeId: id },
      options,
    );

    await TagRefRepository.destroy(Task, null, id, options);

    await ProgramRepository.updateStatusFromTask(
      id,
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Task(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async findAllIds(options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Task(options.database)
      .find({
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Task(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async countOpenByUser(
    options: IRepositoryOptions,
    userId = null,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    return (
      (await this.count(
        {
          status: {
            $ne: 'Complete',
          },
          owner: userId ?? currentUser.id,
        },
        options,
      )) ?? 0
    );
  }

  static async countOverdueByUser(
    options: IRepositoryOptions,
    userId = null,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    return (
      (await this.count(
        {
          status: {
            $ne: 'Complete',
          },
          owner: userId ?? currentUser.id,
          dueDate: {
            $lt: new Date(),
          },
        },
        options,
      )) ?? 0
    );
  }

  static async countRequireReviewByUser(
    options: IRepositoryOptions,
    userId = null,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    return (
      (await this.count(
        {
          status: {
            $ne: 'Complete',
          },
          approver: userId ?? currentUser.id,
        },
        options,
      )) ?? 0
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Task(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate('taskList')
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate('priority')
          .populate({
            path: 'owner',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'approver',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'newsArticles',
            select: [
              '_id',
              'title',
              'link',
              'date',
              'tenant',
            ],
          })
          .populate({
            path: 'products',
            select: ['_id', 'title', 'tenant'],
          })
          .populate({
            path: 'projects',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'policyTemplates',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'policies',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'highlights',
            select: ['_id', 'title', 'tenant'],
          })
          .populate({
            path: 'attachments',
            populate: ['uploader'].join(' '),
          })
          .populate({
            path: 'createdBy',
            populate: ['avatars'].join(' '),
          }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
      false,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      switch (filter.summary) {
        case 'open': {
          criteriaAnd.push({
            status: { $ne: 'Complete' },
          });
          break;
        }
        case 'overdue': {
          criteriaAnd.push({
            status: { $ne: 'Complete' },
            dueDate: {
              $lt: new Date(),
            },
          });
          break;
        }
        case 'requireReview': {
          criteriaAnd.push({
            status: { $ne: 'Complete' },
          });
          break;
        }
      }

      if (
        filter.openTasksOnly === true ||
        filter.openTasksOnly === 'true'
      ) {
        criteriaAnd.push({
          status: { $ne: 'Complete' },
        });
      }

      if (
        filter.contains === true ||
        filter.contains === 'true'
      ) {
        MongooseQueryUtils.pushInCriteria(
          criteriaAnd,
          filter,
          { _id: 'ids' },
          true,
        );
      }

      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        {
          _id: 'id',
          priority: 'priority',
          owner: 'owner',
          approver: 'approver',
        },
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        [
          'reference',
          'dueDate',
          'completedDate',
          'createdAt',
        ],
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['title'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['repeat', 'status'],
      );

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Task,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows: any = [];

    if (!filter?.export && metaOnly) {
      rows = await Task(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('taskList')
        .populate('priority')
        .populate({
          path: 'owner',
          populate: ['avatars'].join(' '),
        })
        .populate({
          path: 'approver',
          populate: ['avatars'].join(' '),
        });
    } else {
      rows = await Task(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('taskList')
        .populate({
          path: 'notes',
          populate: ['createdBy'].join(' '),
        })
        .populate('priority')
        .populate({
          path: 'owner',
          populate: ['avatars'].join(' '),
        })
        .populate({
          path: 'approver',
          populate: ['avatars'].join(' '),
        })
        .populate({
          path: 'attachments',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'createdBy',
          populate: ['avatars'].join(' '),
        });
    }

    const count = await Task(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
            !filter?.export && metaOnly,
          ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            title: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('title_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Task(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .select(['_id', 'title']);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Task(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.owner =
      await UserRepository.cleanupForRelationships(
        output.owner,
        options,
      );

    output.approver =
      await UserRepository.cleanupForRelationships(
        output.approver,
        options,
      );

    output.tags = await TagRefRepository.assignTags(
      Task,
      null,
      output.id,
      options,
    );

    if (metaOnly) {
      return output;
    }

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.attachments =
      await FileRepository.cleanupForRelationships(
        output.attachments,
        options,
      );

    output.notes =
      await NoteRepository.cleanupForRelationships(
        output.notes,
        options,
        false,
      );

    return output;
  }
}

export default TaskRepository;
