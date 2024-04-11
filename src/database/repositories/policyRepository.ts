import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import Policy from '../models/policy';
import PolicyFavoriteRepository from './policyFavoriteRepository';
import PolicyInstanceRepository from './policyInstanceRepository';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import UserRepository from './userRepository';

class PolicyRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Policy(options.database).create(
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
      data.attachment,
      {
        type: FileRepository.TYPE_POLICY,
        typeId: record.id,
        typeTitle: record.name,
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
        Policy(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Policy(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await FileRepository.assignRelatedData(
      data.attachment,
      {
        type: FileRepository.TYPE_POLICY,
        typeId: record.id,
        typeTitle: record.name,
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
        Policy(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await PolicyInstanceRepository.destroyByPolicy(
      id,
      options,
    );

    const leftPolicyInstances =
      await PolicyInstanceRepository.count(
        { policy: id },
        options,
      );

    if (leftPolicyInstances) {
      return true;
    }

    await Policy(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await PolicyFavoriteRepository.destroyByPolicy(
      id,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Task(options.database),
      'policies',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Risk(options.database),
      'policies',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      TaskInstance(options.database),
      'policies',
      options,
    );

    await FileRepository.releaseRelatedData(
      { type: FileRepository.TYPE_POLICY, typeId: id },
      options,
    );

    await TagRefRepository.destroy(
      Policy,
      null,
      id,
      options,
    );

    return false;
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

    const records = await Policy(options.database)
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
      Policy(options.database).countDocuments({
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
        Policy(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate({
            path: 'publishedBy',
            populate: ['avatars'].join(' '),
          })
          .populate({
            path: 'attachment',
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
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name', 'link'],
      );

      if (filter.type) {
        criteriaAnd.push({
          type: filter.type,
        });
      }

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['version', 'lastPublishedDate', 'createdAt'],
      );

      if (
        filter.favorites === true ||
        filter.favorites === 'true'
      ) {
        criteriaAnd.push({
          _id: {
            $in: await PolicyFavoriteRepository.policiesInTenant(
              null,
              options,
            ),
          },
        });
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Policy,
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

    let rows = await Policy(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'publishedBy',
        populate: ['avatars'].join(' '),
      })
      .populate({
        path: 'attachment',
        populate: ['uploader'].join(' '),
      })
      .populate({
        path: 'createdBy',
        populate: ['avatars'].join(' '),
      });

    const count = await Policy(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(async (row) =>
        this._mapRelationshipsAndFillDownloadUrl(
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

    const records = await Policy(options.database)
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
        entityName: Policy(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.tags = await TagRefRepository.assignTags(
      Policy,
      null,
      output.id,
      options,
    );

    output.favorite =
      await PolicyFavoriteRepository.filterIdByPolicy(
        output.id,
        options,
      );

    output.attachment =
      await FileRepository.cleanupForRelationships(
        output.attachment,
        options,
      );

    output.publishedBy =
      await UserRepository.cleanupForRelationships(
        output.publishedBy,
        options,
      );

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    if (metaOnly) {
      return output;
    }

    output.notes =
      await NoteRepository.cleanupForRelationships(
        output.notes,
        options,
        false,
      );

    return output;
  }
}

export default PolicyRepository;
