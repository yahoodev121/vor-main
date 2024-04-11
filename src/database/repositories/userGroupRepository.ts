import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import User from '../models/user';
import UserGroup from '../models/userGroup';
import UserRepository from './userRepository';
import { safeBoolean } from '../../utils/objectUtils';

class UserGroupRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await UserGroup(
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

    await this.addGroup(data.users, record.id, options);

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
        UserGroup(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    // await this.removeGroup(
    //   record.users,
    //   record.id,
    //   options,
    // );

    await UserGroup(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    // await this.addGroup(data.users, record.id, options);

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async toggle(
    groupId,
    userId,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        UserGroup(options.database).findOne({
          _id: groupId,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    let users: any[] = [];

    if (record.users.includes(userId)) {
      users = record.users.filter(
        (user) =>
          user.toHexString() !== userId.toHexString(),
      );
      await this.removeGroup([userId], record.id, options);
    } else {
      users = [...record.users, userId];
      await this.addGroup([userId], record.id, options);
    }

    await UserGroup(options.database).updateOne(
      { _id: groupId },
      {
        users: users,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      groupId,
      {
        users: users,
      },
      options,
    );

    record = await this.findById(groupId, options);

    return record;
  }

  static async toggles(
    groupId,
    userIds,
    doAssign,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        UserGroup(options.database).findOne({
          _id: groupId,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    let users: any[] = [];

    if (doAssign) {
      users = [...new Set([...record.users, ...userIds])];
      await this.addGroup(userIds, record.id, options);
    } else {
      users =
        record.users.filter(
          (user) =>
            !userIds.some(
              (id) =>
                id.toHexString() === user.toHexString(),
            ),
        ) || [];
      await this.removeGroup(userIds, record.id, options);
    }

    await UserGroup(options.database).updateOne(
      { _id: groupId },
      {
        users: users,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      groupId,
      {
        users: users,
      },
      options,
    );

    record = await this.findById(groupId, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        UserGroup(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await this.removeGroup(
      record.users,
      record.id,
      options,
    );

    await UserGroup(options.database).deleteOne(
      { _id: id },
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

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await UserGroup(options.database)
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
      UserGroup(options.database).countDocuments({
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
        UserGroup(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'users',
            options: { limit: 3 },
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
      if (
        filter.userId &&
        !safeBoolean(filter.showAllUserGroups)
      ) {
        MongooseQueryUtils.pushEqualUUIDCriteria(
          criteriaAnd,
          filter,
          {
            users: 'userId',
          },
        );
      }

      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        {
          _id: 'id',
        },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['type'],
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

    let rows = await UserGroup(options.database)
      .find(criteria, {
        name: 1,
        type: 1,
        users: 1,
        tenant: 1,
        createdBy: 1,
        createdAt: 1,
        updatedBy: 1,
        updatedAt: 1,
        totalUsers: {
          $size: '$users',
        },
      })
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'users',
        options: { limit: 3 },
      })
      .populate({
        path: 'createdBy',
        populate: ['avatars'].join(' '),
      });

    const count = await UserGroup(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
            filter,
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

    const records = await UserGroup(options.database)
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
        entityName: UserGroup(options.database).modelName,
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
    filter?,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.users =
      await UserRepository.cleanupForRelationships(
        output.users,
        options,
      );

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.assigned = false;
    if (filter?.userId) {
      const user = await UserRepository.findById(
        filter?.userId,
        options,
        true,
      );
      output.assigned =
        user?.tenants
          ?.find(
            ({ tenant }) =>
              tenant.id === options.currentTenant.id,
          )
          ?.userGroups?.map((group) => group.toHexString())
          .includes(output.id) || false;
    }

    return output;
  }

  static async addGroup(
    users,
    userGroup,
    options: IRepositoryOptions,
  ) {
    if (!users || !users.length) {
      return;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await User(options.database).updateMany(
      {
        _id: { $in: users },
        'tenants.tenant': currentTenant.id,
      },
      {
        $addToSet: {
          'tenants.$.userGroups': userGroup,
        },
      },
      options,
    );
  }

  static async removeGroup(
    users,
    userGroup,
    options: IRepositoryOptions,
  ) {
    if (!users || !users.length) {
      return;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await User(options.database).updateMany(
      {
        _id: { $in: users },
        'tenants.tenant': currentTenant.id,
      },
      {
        $pull: { 'tenants.$.userGroups': userGroup },
      },
      options,
    );
  }
}

export default UserGroupRepository;
