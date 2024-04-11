import { hasRole } from '../utils/userTenantUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import CampaignInstance from '../models/campaignInstance';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Roles from '../../security/roles';
import UserRepository from './userRepository';

class CampaignInstanceRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await CampaignInstance(
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

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async filterAttachments(entity) {
    let attachments: any[] = [];
    if (!entity) {
      return attachments;
    }
    if (!entity.sections) {
      entity.sections = [];
    }
    if (!entity.questions) {
      entity.questions = {};
    }
    for (const section of entity.sections) {
      attachments = [
        ...attachments,
        ...(await this.filterAttachments(
          entity.questions[section.key],
        )),
      ];
      if (!section.type || !section.attachment) {
        continue;
      }
      attachments = [
        ...attachments,
        ...section.attachments,
      ];
    }
    return attachments.filter(Boolean);
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
        CampaignInstance(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await CampaignInstance(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await FileRepository.assignRelatedData(
      await this.filterAttachments(data.questionnaire),
      {
        type: FileRepository.TYPE_CAMPAIGN_INSTANCE,
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
        CampaignInstance(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await CampaignInstance(options.database).deleteOne(
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
      {
        type: FileRepository.TYPE_CAMPAIGN_INSTANCE,
        typeId: id,
      },
      options,
    );
  }

  static async userCondition(options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    return hasRole(options, Roles.values.admin)
      ? undefined
      : {
          users: { $all: [currentUser.id] },
        };
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

    const records = await CampaignInstance(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
        ...(await this.userCondition(options)),
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      CampaignInstance(options.database).countDocuments({
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
        CampaignInstance(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
            ...(await this.userCondition(options)),
          })
          .select([
            '_id',
            'campaign',
            'questionnaire',
            'client',
            'score',
            'vendor',
            'users',
            'status',
          ])
          .populate({
            path: 'client',
            select: ['_id', 'name'],
          })
          .populate({
            path: 'vendor',
            select: ['_id', 'name'],
          })
          .populate({
            path: 'campaign',
            select: ['_id', 'name', 'type', 'audience'],
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

    criteriaAnd.push(await this.userCondition(options));

    criteriaAnd = criteriaAnd.filter(Boolean);

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.client) {
        criteriaAnd.push({
          client: MongooseQueryUtils.uuid(filter.client),
        });
      }

      if (
        filter.contains === true ||
        filter.contains === 'true'
      ) {
        if (filter.ownerCampaign) {
          criteriaAnd.push({
            campaign: MongooseQueryUtils.uuid(
              filter.ownerCampaign,
            ),
          });
        }

        if (filter.ownerClient) {
          criteriaAnd.push({
            client: MongooseQueryUtils.uuid(
              filter.ownerClient,
            ),
          });
        }

        if (filter.ownerVendor) {
          criteriaAnd.push({
            vendor: MongooseQueryUtils.uuid(
              filter.ownerVendor,
            ),
          });
        }
      }

      if (filter.vendor) {
        criteriaAnd.push({
          vendor: MongooseQueryUtils.uuid(filter.vendor),
        });
      }

      if (filter.submittedBy) {
        criteriaAnd.push({
          submittedBy: MongooseQueryUtils.uuid(
            filter.submittedBy,
          ),
        });
      }

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['title', 'additionalContacts'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['status'],
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['progress', 'submittedDate', 'createdAt'],
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

    let rows = await CampaignInstance(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .select([
        'id',
        'reference',
        'name',
        'status',
        'progress',
        'score',
        'vendor',
        'client',
        'users',
        'submittedDate',
        'submittedBy',
      ])
      .populate({
        path: 'vendor',
        select: ['name'],
      })
      .populate({
        path: 'client',
        select: ['name'],
      })
      .populate({
        path: 'users',
        populate: ['avatars'].join(' '),
      })
      .populate({
        path: 'submittedBy',
        populate: ['avatars'].join(' '),
      });

    const count = await CampaignInstance(
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

    criteriaAnd.push(await this.userCondition(options));

    criteriaAnd = criteriaAnd.filter(Boolean);

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

    const records = await CampaignInstance(options.database)
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
        entityName: CampaignInstance(options.database)
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

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const output = record.toObject
      ? record.toObject()
      : record;

    output.answerMode = Boolean(
      output.users?.find(
        (user) =>
          (user._id || user).toHexString() ===
          currentUser.id,
      ) || false,
    );

    output.users =
      await UserRepository.cleanupForRelationships(
        output.users,
        options,
      );

    output.submittedBy =
      await UserRepository.cleanupForRelationships(
        output.submittedBy,
        options,
      );

    if (metaOnly) {
      return output;
    }

    const populateQuestionnaireAttachments = async (
      entity,
    ) => {
      if (!entity) {
        return;
      }
      if (!entity.sections) {
        entity.sections = [];
      }
      if (!entity.questions) {
        entity.questions = {};
      }
      for (const section of entity.sections) {
        await populateQuestionnaireAttachments(
          entity.questions[section.key],
        );
        if (!section.type || !section.attachment) {
          continue;
        }
        section.attachments =
          await FileRepository.findByIds(
            section.attachments,
            options,
          );
      }
    };

    await populateQuestionnaireAttachments(
      output.questionnaire,
    );

    return output;
  }
}

export default CampaignInstanceRepository;
