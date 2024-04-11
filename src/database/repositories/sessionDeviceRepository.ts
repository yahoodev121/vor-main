import { IRepositoryOptions } from './IRepositoryOptions';
import Error404 from '../../errors/Error404';
import hash from 'object-hash';
import moment from 'moment';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import SessionDevice from '../models/sessionDevice';
import UserRepository from './userRepository';

class SessionDeviceRepository {
  private static async filter(options: IRepositoryOptions) {
    return {
      ip: options.clientIP ?? options.ip,
      hash: hash(options.device),
      user: MongooseRepository.getCurrentUser(options)?.id,
    };
  }

  private static async data(options: IRepositoryOptions) {
    return {
      geoIP: options.geoIP,
      ...options.device,
    };
  }

  static async updateSessionDevice(
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);
    if (!currentUser?.id) {
      return null;
    }
    if (currentUser && currentUser.impersonate) {
      return null;
    }
    const record = await SessionDevice(
      options.database,
    ).findOneAndUpdate(
      await this.filter(options),
      await this.data(options),
      {
        new: true,
        upsert: true,
      },
    );
    await SessionDevice(options.database).updateOne(
      {
        _id: record.id,
      },
      {
        $addToSet: {
          sessions: currentUser.lastLoginAt,
        },
      },
      options,
    );
    return record.id;
  }

  static async findById(id, options: IRepositoryOptions) {
    const record =
      await MongooseRepository.wrapWithSessionIfExists(
        SessionDevice(options.database)
          .findOne({
            _id: id,
          })
          .populate({
            path: 'user',
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
    userId,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    let criteriaAnd: any = [];

    if (userId) {
      criteriaAnd.push({
        user: MongooseQueryUtils.uuid(userId),
      });
    }

    const sort = MongooseQueryUtils.sort('updatedAt_DESC');

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows: any = [];

    const columns = [
      '_id',
      'ip',
      'user',
      'geoIP',
      'os',
      'client',
      'device',
    ];

    if (metaOnly) {
      rows = await SessionDevice(options.database)
        .find(criteria)
        .sort(sort)
        .select(columns);
    } else {
      rows = await SessionDevice(options.database)
        .find(criteria)
        .sort(sort)
        .populate({
          path: 'user',
          populate: ['avatars'].join(' '),
        })
        .select(columns);
    }

    const count = await SessionDevice(
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

    output.currentDateTime = moment().toISOString();

    output.user =
      await UserRepository.cleanupForRelationships(
        output.user,
        options,
      );

    return output;
  }
}

export default SessionDeviceRepository;
