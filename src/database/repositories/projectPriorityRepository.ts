import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error400 from '../../errors/Error400';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Project from '../models/project';
import ProjectPriority from '../models/projectPriority';
import ProjectPriorityRepositoryEx from './extend/projectPriorityRepositoryEx';
import UserRepository from './userRepository';

class ProjectPriorityRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await ProjectPriority(
      options.database,
    ).create(
      [
        {
          ...data,
          system: data.system ?? false,
          order:
            data.order ??
            ProjectPriorityRepositoryEx
              .DEFAULT_PRIORITY_NAMES.length,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
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
        ProjectPriority(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    if (record.system) {
      throw new Error400(
        currentTenant.language,
        'errors.forbidden.message',
      );
    }

    await ProjectPriority(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
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

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProjectPriority(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    if (record.system) {
      throw new Error400(
        currentTenant.language,
        'errors.forbidden.message',
      );
    }

    let projects =
      await MongooseRepository.wrapWithSessionIfExists(
        Project(options.database).countDocuments({
          priority: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (projects) {
      throw new Error400(
        currentTenant.language,
        'errors.inUse.message',
        record.priority,
      );
    }

    await ProjectPriority(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Project(options.database),
      'priority',
      options,
    );
  }

  static async replaceIdInTenant(
    taskPriority,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.replaceIdsInTenant(
        [taskPriority],
        options,
      ),
      '[0]',
      null,
    );
  }

  static async replaceIdsInTenant(
    projectPriorities,
    options: IRepositoryOptions,
  ) {
    if (!projectPriorities || !projectPriorities.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const ids: any[] = [];

    for (const priority of projectPriorities) {
      if (MongooseQueryUtils.isValidObjectId(priority)) {
        ids.push(priority);
        continue;
      }

      const projectPriority = await ProjectPriority(
        options.database,
      ).findOneAndUpdate(
        {
          priority: priority,
          tenant: currentTenant.id,
        },
        {},
        { new: true, upsert: true },
      );

      ids.push(projectPriority.id);
    }

    return await this.filterIdsInTenant(ids, options);
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

    const records = await ProjectPriority(options.database)
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
      ProjectPriority(options.database).countDocuments({
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
        ProjectPriority(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
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
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        { _id: 'id' },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['priority'],
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['createdAt'],
      );
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ProjectPriority(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectPriority(
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
            priority: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('order_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProjectPriority(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .select(['_id', 'priority']);

    return records.map((record) => ({
      id: record.id,
      label: record.priority,
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
        entityName: ProjectPriority(options.database)
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

    const output = record.toObject
      ? record.toObject()
      : record;

    if (metaOnly) {
      return output;
    }

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    return output;
  }
}

export default ProjectPriorityRepository;
