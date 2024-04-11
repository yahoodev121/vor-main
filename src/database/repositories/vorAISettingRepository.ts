import MongooseRepository from './mongooseRepository';
import VorAISetting from '../models/vorAISetting';
import AuditLogRepository from './auditLogRepository';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class VorAISettingRepository {
  static async find(options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return this._fillFileDownloadUrls(
      await MongooseRepository.wrapWithSessionIfExists(
        VorAISetting(options.database)
          .findOne({
            tenant: currentTenant.id,
          })
          .populate('attachments'),
        options,
      ),
      options,
    );
  }

  static async createOrUpdate(
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        VorAISetting(options.database).findOne({
          tenant: currentTenant.id,
        }),
        options,
      );

    if (record) {
      await VorAISetting(options.database).updateOne(
        { _id: record.id },
        { ...data, tenant: currentTenant.id },
        options,
      );

      await AuditLogRepository.log(
        {
          entityName: 'vorAISetting',
          entityId: record.id,
          action: AuditLogRepository.UPDATE,
          values: data,
        },
        options,
      );

      return this._fillFileDownloadUrls(
        await MongooseRepository.wrapWithSessionIfExists(
          VorAISetting(options.database).findById(
            record.id,
          ),
          options,
        ),
        options,
      );
    } else {
      const [vorAISetting] = await VorAISetting(
        options.database,
      ).create(
        [
          {
            ...data,
            tenant: currentTenant.id,
            createdBy: MongooseRepository.getCurrentUser(
              options,
            )
              ? MongooseRepository.getCurrentUser(options)
                  .id
              : null,
          },
        ],
        options,
      );

      await AuditLogRepository.log(
        {
          entityName: 'vorAISetting',
          entityId: vorAISetting.id,
          action: AuditLogRepository.CREATE,
          values: data,
        },
        options,
      );

      return this._fillFileDownloadUrls(
        vorAISetting,
        options,
      );
    }
  }

  static async _fillFileDownloadUrls(record, options) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    return output;
  }
}
