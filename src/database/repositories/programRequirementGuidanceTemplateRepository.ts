import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import ProgramRequirementGuidanceTemplate from '../models/programRequirementGuidanceTemplate';
import ProgramRequirementTemplate from '../models/programRequirementTemplate';
import UserRepository from './userRepository';

class ProgramRequirementGuidanceTemplateRepository {
  static async _updateRelationships(
    data,
    options: IRepositoryOptions,
  ) {
    const models = {
      requirementTemplates: ProgramRequirementTemplate,
    };
    for (const sourceAttr of Object.keys(models)) {
      await MongooseRepository.refreshTwoWayRelationManyToMany(
        data,
        sourceAttr,
        models[sourceAttr](options.database),
        'guidanceTemplates',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] =
      await ProgramRequirementGuidanceTemplate(
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
        ProgramRequirementGuidanceTemplate(
          options.database,
        ).findOne({ _id: id, tenant: currentTenant.id }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramRequirementGuidanceTemplate(
      options.database,
    ).updateOne(
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
        ProgramRequirementGuidanceTemplate(
          options.database,
        ).findOne({ _id: id, tenant: currentTenant.id }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramRequirementGuidanceTemplate(
      options.database,
    ).deleteOne({ _id: id }, options);

    await MongooseRepository.destroyRelationToMany(
      id,
      ProgramRequirementTemplate(options.database),
      'guidanceTemplates',
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
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

    const records =
      await ProgramRequirementGuidanceTemplate(
        options.database,
      )
        .find({
          _id: { $in: ids },
        })
        .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      ProgramRequirementGuidanceTemplate(
        options.database,
      ).countDocuments({
        ...filter,
      }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    skip404 = false,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramRequirementGuidanceTemplate(options.database)
          .findOne({ _id: id })
          .populate({
            path: 'requirementTemplates',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'productCategories',
            select: ['_id', 'name', 'tenant'],
          })
          .populate({
            path: 'createdBy',
            populate: ['avatars'].join(' '),
          }),
        options,
      );

    if (!record) {
      if (skip404) {
        return null;
      }
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
    let criteriaAnd: any = [];

    if (filter) {
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
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ProgramRequirementGuidanceTemplate(
      options.database,
    )
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'requirementTemplates',
        select: ['_id', 'name', 'tenant'],
      })
      .populate({
        path: 'productCategories',
        select: ['_id', 'name', 'tenant'],
      });

    const count = await ProgramRequirementGuidanceTemplate(
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
    let criteriaAnd: Array<any> = [];

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

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const records =
      await ProgramRequirementGuidanceTemplate(
        options.database,
      )
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
        entityName: ProgramRequirementGuidanceTemplate(
          options.database,
        ).modelName,
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

export default ProgramRequirementGuidanceTemplateRepository;
