import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error400 from '../../errors/Error400';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import moment from 'moment';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import PolicyInstance from '../models/policyInstance';
import TagRefRepository from './tagRefRepository';
import UserRepository from './userRepository';

class PolicyInstanceRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await PolicyInstance(
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
    policy,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        PolicyInstance(options.database).findOne({
          policy: policy,
          version: Number(data.version),
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    if (record.lastPublishedDate) {
      throw new Error400(
        options.language,
        'entities.policy.errors.update.published',
      );
    }

    await PolicyInstance(options.database).updateOne(
      { _id: record.id },
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
      record.id,
      data,
      options,
    );

    record = await this.findById(record.id, options);

    return record;
  }

  static async publish(
    policy,
    version,
    options: IRepositoryOptions,
  ) {
    const record = await this.findByPolicyVersion(
      policy,
      version,
      options,
    );

    if (!record.lastPublishedDate) {
      const currentUser =
        MongooseRepository.getCurrentUser(options);

      await PolicyInstance(options.database).updateOne(
        { _id: record.id },
        {
          lastPublishedDate: moment.now(),
          publishedBy: currentUser.id,
          updatedBy: currentUser.id,
        },
        options,
      );
    }

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        PolicyInstance(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await PolicyInstance(options.database).deleteOne(
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
      { type: FileRepository.TYPE_POLICY, typeId: id },
      options,
    );

    await TagRefRepository.destroy(
      PolicyInstance,
      null,
      id,
      options,
    );
  }

  static async destroyByPolicy(
    policyId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const policyInstances = await PolicyInstance(
      options.database,
    )
      .find({
        policy: policyId,
        lastPublishedDate: undefined,
        tenant: currentTenant.id,
      })
      .select(['_id']);

    for (const policyInstance of policyInstances) {
      await this.destroy(policyInstance.id, options);
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

    const records = await PolicyInstance(options.database)
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
      PolicyInstance(options.database).countDocuments({
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
        PolicyInstance(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate({
            path: 'publishedBy',
            populate: ['avatars'].join(' '),
          })
          .populate('attachment')
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

  static async newVersionByPolicy(
    id,
    options: IRepositoryOptions,
  ) {
    const count = await this.count({ policy: id }, options);
    return count + 1;
  }

  static async findByPolicyVersion(
    id,
    version,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        PolicyInstance(options.database)
          .findOne({
            policy: MongooseQueryUtils.uuid(id),
            version: version,
            tenant: currentTenant.id,
          })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate('publishedBy')
          .populate('attachment')
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
    );
  }

  static async findAndCountAll(
    { policy, filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (policy) {
      criteriaAnd.push({
        policy: MongooseQueryUtils.uuid(policy),
      });
    }

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

      if (filter.publishedBy) {
        criteriaAnd.push({
          publishedBy: MongooseQueryUtils.uuid(
            filter.publishedBy,
          ),
        });
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              PolicyInstance,
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

    let rows = await PolicyInstance(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'publishedBy',
        populate: ['avatars'].join(' '),
      })
      .populate('attachment')
      .populate({
        path: 'createdBy',
        populate: ['avatars'].join(' '),
      });

    const count = await PolicyInstance(
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

    const records = await PolicyInstance(options.database)
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
        entityName: PolicyInstance(options.database)
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
      PolicyInstance,
      null,
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

export default PolicyInstanceRepository;
