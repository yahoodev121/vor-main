import { IRepositoryOptions } from './IRepositoryOptions';
import { toUniqueArray } from '../../utils/arrayUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import RiskRepository from './riskRepository';
import TagRefRepository from './tagRefRepository';
import TaskRepository from './taskRepository';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

class VendorRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Vendor(options.database).create(
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

    await FileRepository.assignRelatedData(
      [...data.contract, ...data.documentation],
      {
        type: FileRepository.TYPE_VENDOR,
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

  static async addUserAsSameMember(
    userId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await Vendor(options.database).updateMany(
      {
        users: currentUser.id,
        tenant: currentTenant.id,
      },
      {
        $addToSet: {
          users: userId,
        },
      },
      options,
    );
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
        Vendor(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Vendor(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await FileRepository.assignRelatedData(
      [...data.contract, ...data.documentation],
      {
        type: FileRepository.TYPE_VENDOR,
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

    await Vendor(options.database).updateMany(
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

    await Vendor(options.database).updateMany(
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

  static async addRisk(
    ids,
    riskId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await Vendor(options.database).updateMany(
      {
        risks: {
          $in: [riskId],
        },
        tenant: currentTenant.id,
      },
      {
        $pull: {
          risks: riskId,
        },
      },
      options,
    );

    if (!Boolean(ids.length)) return true;

    await Vendor(options.database).updateMany(
      {
        _id: {
          $in: ids,
        },
        tenant: currentTenant.id,
      },
      {
        $push: {
          risks: riskId,
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
        Vendor(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Vendor(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await FileRepository.releaseRelatedData(
      { type: FileRepository.TYPE_VENDOR, typeId: id },
      options,
    );

    await TagRefRepository.destroy(
      Vendor,
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

    const records = await Vendor(options.database)
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
      Vendor(options.database).countDocuments({
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
        Vendor(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate('category')
          .populate('risks')
          .populate('tasks')
          .populate({
            path: 'users',
            populate: ['avatars'].join(' '),
          })
          .populate('logo')
          .populate({
            path: 'contract',
            populate: ['uploader'].join(' '),
          })
          .populate({
            path: 'documentation',
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
          {
            risks: {
              $in: [MongooseQueryUtils.uuid(search)],
            },
          },
        ],
      });
    }

    const criteria = { $and: criteriaAnd };

    const records =
      await MongooseRepository.wrapWithSessionIfExists(
        Vendor(options.database)
          .find(criteria)
          .select(['_id', 'name']),
        options,
      );

    return records;
  }

  static async filterToCriteria(
    criteriaAnd,
    filter,
    options: IRepositoryOptions,
  ) {
    if (filter) {
      if (filter.receivers) {
        MongooseQueryUtils.pushInCriteria(
          criteriaAnd,
          filter,
          { _id: 'receiverIds' },
          true,
        );
      }

      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        {
          _id: 'id',
          category: 'category',
        },
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['reference', 'createdAt'],
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name', 'internalBusinessSponsor', 'website'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        [
          'status',
          'rating',
          'countryOfIncorporation',
          'industry',
        ],
      );

      if (filter.dataProcessed) {
        criteriaAnd.push({
          dataProcessed: { $all: filter.dataProcessed },
        });
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Vendor,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }
  }

  static async findAllIds(
    { filter },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    await this.filterToCriteria(
      criteriaAnd,
      filter,
      options,
    );

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const rows = await Vendor(options.database)
      .find(criteria)
      .select(['_id']);

    return rows.map((row) => row.id);
  }

  static async findAllRelatedUserIds(
    userId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    const rows = await Vendor(options.database)
      .find({
        tenant: currentTenant.id,
        users: userId,
      })
      .select(['_id', 'users']);
    return toUniqueArray(
      rows
        .reduce((total, row) => total.concat(row.users), [])
        .filter(Boolean),
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    metaOnly = true,
    withOnlyUsers = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    await this.filterToCriteria(
      criteriaAnd,
      filter,
      options,
    );

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
      if (withOnlyUsers) {
        rows = await Vendor(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('users');
      } else {
        rows = await Vendor(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('category');
      }
    } else {
      rows = await Vendor(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate('risks')
        .populate('tasks')
        .populate('users')
        .populate('logo')
        .populate({
          path: 'contract',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'documentation',
          populate: ['uploader'].join(' '),
        })
        .populate({
          path: 'createdBy',
          populate: ['avatars'].join(' '),
        });
    }

    const count = await Vendor(
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

  static async findByUser(
    userId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let rows = await Vendor(options.database).find({
      users: userId,
      tenant: currentTenant.id,
    });

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
          ),
      ),
    );

    return rows;
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

    const records = await Vendor(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .select(['_id', 'name']);

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
        entityName: Vendor(options.database).modelName,
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

    output.tags = await TagRefRepository.assignTags(
      Vendor,
      null,
      output.id,
      options,
    );

    if (metaOnly) {
      return output;
    }

    output.logo =
      await FileRepository.cleanupForRelationships(
        output.logo,
        options,
      );

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.users =
      await UserRepository.cleanupForRelationships(
        output.users,
        options,
      );

    output.contract =
      await FileRepository.cleanupForRelationships(
        output.contract,
        options,
      );

    output.documentation =
      await FileRepository.cleanupForRelationships(
        output.documentation,
        options,
      );

    output.openTasks = await TaskRepository.count(
      {
        _id: { $in: output.tasks.map((v) => v.id) },
        status: { $ne: 'Complete' },
      },
      options,
    );

    output.openRisks = await RiskRepository.count(
      {
        _id: { $in: output.risks.map((v) => v.id) },
        status: 'Open',
      },
      options,
    );

    return output;
  }
}

export default VendorRepository;
