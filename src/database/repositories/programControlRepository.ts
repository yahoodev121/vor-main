import { IRepositoryOptions } from './IRepositoryOptions';
import { summarizeControl } from '../../utils/programControlUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import ProgramControl from '../models/programControl';
import ProgramRepository from './programRepository';
import ProgramRequirement from '../models/programRequirement';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import UserRepository from './userRepository';
import TaskRepository from './taskRepository';

class ProgramControlRepository {
  static async _updateRelationships(
    data,
    options: IRepositoryOptions,
  ) {
    const models = {
      requirements: ProgramRequirement,
    };
    for (const sourceAttr of Object.keys(models)) {
      await MongooseRepository.refreshTwoWayRelationManyToMany(
        data,
        sourceAttr,
        models[sourceAttr](options.database),
        'controls',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await ProgramControl(
      options.database,
    ).create(
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
        type: FileRepository.TYPE_PROGRAM_CONTROL,
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

    await ProgramRepository.updateStatusFromControl(
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
        ProgramControl(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramControl(options.database).updateOne(
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
        type: FileRepository.TYPE_PROGRAM_CONTROL,
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

    await ProgramRepository.updateStatusFromControl(
      record.id,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async addTask(
    ids,
    taskId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await ProgramControl(options.database).updateMany(
      {
        tasks: {
          $in: [taskId],
        },
        tenant: currentTenant.id,
      },
      {
        $pull: {
          tasks: taskId,
        },
      },
      options,
    );

    if (!Boolean(ids.length)) return true;

    await ProgramControl(options.database).updateMany(
      {
        _id: {
          $in: ids,
        },
        tenant: currentTenant.id,
      },
      {
        $push: {
          tasks: taskId,
        },
      },
      options,
    );

    return true;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramControl(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramControl(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    for (const model of [ProgramRequirement, Risk]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        model(options.database),
        'controls',
        options,
      );
    }

    await TagRefRepository.destroy(
      ProgramControl,
      null,
      id,
      options,
    );

    await FileRepository.releaseRelatedData(
      {
        type: FileRepository.TYPE_PROGRAM_CONTROL,
        typeId: id,
      },
      options,
    );

    await ProgramRepository.updateStatusFromControl(
      id,
      options,
    );

    if (record.tasks.length) {
      await Promise.all(
        record.tasks.map(
          async (id) =>
            await TaskRepository.destroy(id, options),
        ),
      );
    }
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

    const records = await ProgramControl(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdsHaveTask(
    taskId,
    options: IRepositoryOptions,
  ) {
    if (!taskId) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProgramControl(options.database)
      .find({
        tasks: taskId,
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      ProgramControl(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramControl(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'tasks',
            select: ['_id', 'title'],
          })
          .populate({
            path: 'requirements',
            select: ['_id', 'name', 'requirementID'],
          })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
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

  static async findForLinks(
    search,
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
            tasks: {
              $in: [MongooseQueryUtils.uuid(search)],
            },
          },
        ],
      });
    }

    const criteria = { $and: criteriaAnd };

    const records =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramControl(options.database)
          .find(criteria)
          .select(['_id', 'name']),
        options,
      );

    return records;
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
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

      if (
        filter.byRequirements === true ||
        filter.byRequirements === 'true'
      ) {
        MongooseQueryUtils.pushInCriteria(
          criteriaAnd,
          filter,
          ['requirements'],
          true,
        );
      }

      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        { _id: 'id' },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name', 'description'],
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['createdAt'],
      );

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              ProgramControl,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ProgramControl(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'tasks',
        select: [
          '_id',
          'reference',
          'title',
          'status',
          'repeat',
          'completedDate',
          'dueDate',
          'owner',
          'approver',
        ],
        populate: [
          {
            path: 'owner',
            model: 'user',
            populate: {
              path: 'avatars',
              model: 'file',
            },
          },
          {
            path: 'approver',
            model: 'user',
            populate: {
              path: 'avatars',
              model: 'file',
            },
          },
        ],
      })
      .populate({
        path: 'requirements',
        select: ['_id', 'name', 'requirementID'],
      });

    const count = await ProgramControl(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
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
            name: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProgramControl(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.name,
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
        entityName: ProgramControl(options.database)
          .modelName,
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

    const output = summarizeControl(
      record.toObject ? record.toObject() : record,
    );

    output.tasks = await Promise.all(
      output.tasks?.map(async (task) => ({
        ...task,
        owner: await UserRepository.cleanupForRelationships(
          task.owner,
          options,
        ),
        approver:
          await UserRepository.cleanupForRelationships(
            task.approver,
            options,
          ),
      })) ?? [],
    );

    if (metaOnly) {
      return output;
    }

    output.tags = await TagRefRepository.assignTags(
      ProgramControl,
      null,
      output.id,
      options,
    );

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

export default ProgramControlRepository;
