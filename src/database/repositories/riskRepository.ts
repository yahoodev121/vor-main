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
import Project from '../models/project';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import TaskRepository from './taskRepository';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

class RiskRepository {
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
        'risks',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Risk(options.database).create(
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
        type: FileRepository.TYPE_RISK,
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
        Risk(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Risk(options.database).updateOne(
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
        type: FileRepository.TYPE_RISK,
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

    await Risk(options.database).updateMany(
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

    await Risk(options.database).updateMany(
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
        Risk(options.database).findOne({
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
          risks: id,
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
          risks: id,
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

    // let projects =
    //   await MongooseRepository.wrapWithSessionIfExists(
    //     Project(options.database).countDocuments({
    //       risks: id,
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

    await Risk(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    for (const model of [Client, Vendor, Project]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        model(options.database),
        'risks',
        options,
      );
    }

    await FileRepository.releaseRelatedData(
      {
        type: FileRepository.TYPE_RISK,
        typeId: id,
      },
      options,
    );

    await TagRefRepository.destroy(
      Risk,
      null,
      record.id,
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

    const records = await Risk(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Risk(options.database).countDocuments({
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
          status: 'Open',
          owner: userId ?? currentUser.id,
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
        Risk(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate('category')
          .populate({
            path: 'owner',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate('tasks')
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
            path: 'requirements',
            select: [
              '_id',
              'name',
              'tenant',
              'requirementID',
            ],
          })
          .populate({
            path: 'controls',
            select: ['_id', 'name', 'tenant'],
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
        Risk(options.database)
          .find(criteria)
          .select(['_id', 'title']),
        options,
      );

    return records;
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
            status: 'Open',
          });
          break;
        }
      }

      if (
        filter.openRisksOnly === true ||
        filter.openRisksOnly === 'true'
      ) {
        criteriaAnd.push({
          status: 'Open',
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
          category: 'category',
          owner: 'owner',
        },
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['reference', 'residualScore', 'cost', 'createdAt'],
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['title'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['status', 'likelihood', 'impact', 'inherentScore'],
      );

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Risk,
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
      rows = await Risk(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate({
          path: 'owner',
          populate: ['avatars'].join(' '),
        });
    } else {
      rows = await Risk(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate({
          path: 'owner',
          populate: ['avatars'].join(' '),
        })
        .populate({
          path: 'notes',
          populate: ['createdBy'].join(' '),
        })
        .populate('tasks')
        .populate({
          path: 'attachments',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'createdBy',
          populate: ['avatars'].join(' '),
        });
    }

    const count = await Risk(
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

    const records = await Risk(options.database)
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
        entityName: Risk(options.database).modelName,
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

    output.tags = await TagRefRepository.assignTags(
      Risk,
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

    output.openTasks = await TaskRepository.count(
      {
        _id: { $in: output.tasks.map((v) => v.id) },
        status: { $ne: 'Complete' },
      },
      options,
    );

    return output;
  }
}

export default RiskRepository;
