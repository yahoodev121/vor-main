import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Campaign from '../models/campaign';
import CampaignInstance from '../models/campaignInstance';
import Client from '../models/client';
import Document from '../models/file';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import FileStorage from '../../services/file/fileStorage';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Policy from '../models/policy';
import ProgramControl from '../models/programControl';
import Project from '../models/project';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

class DocumentRepository {
  static TYPE_MODELS = {
    [FileRepository.TYPE_CAMPAIGN_INSTANCE]:
      CampaignInstance,
    [FileRepository.TYPE_CAMPAIGN]: Campaign,
    [FileRepository.TYPE_CLIENT]: Client,
    [FileRepository.TYPE_POLICY]: Policy,
    [FileRepository.TYPE_PROGRAM_CONTROL]: ProgramControl,
    [FileRepository.TYPE_PROJECT]: Project,
    [FileRepository.TYPE_RISK]: Risk,
    [FileRepository.TYPE_TASK_INSTANCE]: TaskInstance,
    [FileRepository.TYPE_TASK]: Task,
    [FileRepository.TYPE_VENDOR]: Vendor,
  };

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Document(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
          isTemp: false,
          isAttached: true,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Document(options.database).updateOne(
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
        Document(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
          isTemp: false,
          isAttached: true,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Document(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    if (record.type === FileRepository.TYPE_CLIENT) {
      for (const field of ['contract', 'documentation']) {
        await MongooseRepository.destroyRelationToMany(
          id,
          Client(options.database),
          field,
          options,
        );
      }
    } else if (record.type === FileRepository.TYPE_VENDOR) {
      for (const field of ['contract', 'documentation']) {
        await MongooseRepository.destroyRelationToMany(
          id,
          Vendor(options.database),
          field,
          options,
        );
      }
    } else if (record.type === FileRepository.TYPE_TASK) {
      await MongooseRepository.destroyRelationToMany(
        id,
        Task(options.database),
        'attachments',
        options,
      );
      await MongooseRepository.destroyRelationToMany(
        id,
        TaskInstance(options.database),
        'attachments',
        options,
      );
    } else if (this.TYPE_MODELS[record.type]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        this.TYPE_MODELS[record.type](options.database),
        'attachments',
        options,
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

    const records = await Document(options.database)
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
      Document(options.database).countDocuments({
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
        Document(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
            isTemp: false,
            isAttached: true,
          })
          .populate({
            path: 'uploader',
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
    metaOnly = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [
      {
        tenant: currentTenant.id,
        isTemp: false,
        isAttached: true,
      },
    ];

    if (filter) {
      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        {
          _id: 'id',
          uploader: 'uploader',
          typeId: 'typeId',
        },
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['type'],
      );

      MongooseQueryUtils.pushInCriteria(
        criteriaAnd,
        filter,
        {
          type: 'types',
        },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['title', 'typeTitle', 'name'],
      );

      if (filter.extension) {
        const exts = filter.extension
          .split(/[ ]*,[ ]*/)
          .filter((ext) => ext.trim() !== '');

        if (exts.length > 0) {
          criteriaAnd.push({
            name: {
              $in: exts.map(
                (ext) => new RegExp(`.${ext.trim()}$`, 'i'),
              ),
            },
          });
        }
      }

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['size', 'uploadedAt'],
      );

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Document,
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

    let rows = await Document(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'uploader',
        populate: ['avatars'].join(' '),
      });

    const count = await Document(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
            metaOnly,
          ),
      ),
    );

    return { rows, count };
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: Document(options.database).modelName,
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

    let downloadUrl;

    if (record.publicUrl) {
      downloadUrl = record.publicUrl;
    } else {
      downloadUrl = await FileStorage.downloadUrl(
        record.name,
        record.privateUrl,
      );
    }

    output.downloadUrl = downloadUrl;

    if (metaOnly) {
      return output;
    }

    output.uploader =
      await UserRepository.cleanupForRelationships(
        output.uploader,
        options,
      );

    output.tags = await TagRefRepository.assignTags(
      Document,
      null,
      output.id,
      options,
    );

    return output;
  }
}

export default DocumentRepository;
