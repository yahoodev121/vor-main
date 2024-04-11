import { getUserNameOrEmailPrefix } from '../../utils/userUtils';
import {
  hasRole,
  hasRolesOnly,
  isUserInTenant,
} from '../utils/userTenantUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import { toUniqueArray } from '../../utils/arrayUtils';
import AuditLogRepository from './auditLogRepository';
import ClientRepository from './clientRepository';
import crypto from 'crypto';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import MuiRepository from './muiRepository';
import Roles from '../../security/roles';
import SettingsRepository from './settingsRepository';
import TaskPriorityRepositoryEx from './extend/taskPriorityRepositoryEx';
import User from '../models/user';
import VendorRepository from './vendorRepository';
import { safeBoolean } from '../../utils/objectUtils';
import UserGroup from '../models/userGroup';

export default class UserRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    const [user] = await User(options.database).create(
      [
        {
          email: data.email,
          firstName: data.firstName || null,
          lastName: data.lastName || null,
          fullName: data.fullName || null,
          phoneNumber: data.phoneNumber || null,
          importHash: data.importHash || null,
          avatars: data.avatars || [],
          builtin: false,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async createFromAuth(
    data,
    options: IRepositoryOptions,
  ) {
    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          fullName: data.fullName,
          builtin: false,
        },
      ],
      options,
    );

    delete user.password;
    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateLastLoginAt(
    id,
    options: IRepositoryOptions,
  ) {
    await User(options.database).updateOne(
      { _id: id },
      {
        lastLoginAt: new Date(),
      },
      options,
    );
  }

  static async updatePassword(
    id,
    password,
    invalidateOldTokens: boolean,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const data: any = {
      password,
      updatedBy: currentUser.id,
    };

    if (invalidateOldTokens) {
      data.jwtTokenInvalidBefore = new Date();
    }

    await User(options.database).updateOne(
      { _id: id },
      data,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          password: 'secret',
        },
      },
      options,
    );

    return this.findById(id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static async updateProfile(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        jobTitle: data.jobTitle || null,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async generateEmailVerificationToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const emailVerificationToken = crypto
      .randomBytes(20)
      .toString('hex');
    const emailVerificationTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerificationToken,
        emailVerificationTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          emailVerificationToken,
          emailVerificationTokenExpiresAt,
        },
      },
      options,
    );

    return emailVerificationToken;
  }

  static async generatePasswordResetToken(
    email,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const { id } = await this.findByEmailWithoutAvatar(
      email,
      options,
    );

    const passwordResetToken = crypto
      .randomBytes(20)
      .toString('hex');
    const passwordResetTokenExpiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    await User(options.database).updateOne(
      { _id: id },
      {
        passwordResetToken,
        passwordResetTokenExpiresAt,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          passwordResetToken,
          passwordResetTokenExpiresAt,
        },
      },
      options,
    );

    return passwordResetToken;
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    data = this._preSave(data);

    await User(options.database).updateOne(
      { _id: id },
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        updatedBy: currentUser.id,
        avatars: data.avatars || [],
      },
      options,
    );

    const user = await this.findById(id, options);

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async findByEmail(
    email,
    options: IRepositoryOptions,
  ) {
    const record = await this.findByEmailWithoutAvatar(
      email,
      options,
    );
    return await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
    );
  }

  static async findByEmailWithoutAvatar(
    email,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findOne({
          email: {
            $regex: new RegExp(
              `^${MongooseQueryUtils.escapeRegExp(email)}$`,
            ),
            $options: 'i',
          },
        })
        .populate('avatars')
        .populate('tenants.tenant'),
      options,
    );
  }

  static async findByRole(
    role,
    options: IRepositoryOptions,
    equal = true,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    const rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find({
            'tenants.tenant': currentTenant.id,
            'tenants.roles': equal
              ? role
              : {
                  $ne: role,
                },
            builtin: false,
          })
          .select([
            '_id',
            'firstName',
            'lastName',
            'email',
          ]),
        options,
      );
    return rows.map((row) => row.toObject());
  }

  static async findWithRole(
    role,
    options: IRepositoryOptions,
  ) {
    return this.findByRole(role, options);
  }

  static async findWithoutRole(
    role,
    options: IRepositoryOptions,
  ) {
    return this.findByRole(role, options, false);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
    withoutCurrentUser = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenants: { $elemMatch: { tenant: currentTenant.id } },
      builtin: false,
    });

    if (withoutCurrentUser) {
      criteriaAnd.push({
        _id: {
          $ne: currentUser.id,
        },
      });
      if (!hasRole(options, Roles.values.admin)) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: {
              roles: { $ne: Roles.values.admin },
            },
          },
        });
      }
    }

    if (
      hasRolesOnly(options, [
        Roles.values.client,
        Roles.values.vendor,
      ])
    ) {
      const userIds: any[] = [];
      userIds.push(
        ...(await VendorRepository.findAllRelatedUserIds(
          currentUser.id,
          options,
        )),
      );
      userIds.push(
        ...(await ClientRepository.findAllRelatedUserIds(
          currentUser.id,
          options,
        )),
      );
      criteriaAnd.push({
        _id: {
          $in: toUniqueArray(userIds),
        },
      });
    }

    if (filter) {
      if (
        filter.groupId &&
        !safeBoolean(filter.showAllUsers)
      ) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: {
              userGroups: filter.groupId,
            },
          },
        });
      }

      if (safeBoolean(filter.limitRoles)) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: {
              roles: {
                $nin: Roles.banUserGroupRoles,
              },
            },
          },
        });
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
        ['fullName', 'email'],
      );

      if (filter.role) {
        criteriaAnd.push({
          tenants: { $elemMatch: { roles: filter.role } },
        });
      }

      if (filter.status) {
        criteriaAnd.push({
          tenants: {
            $elemMatch: { status: filter.status },
          },
        });
      }

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

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .skip(skip)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars')
          .populate('tenants.tenant'),
        options,
      );

    const count =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).countDocuments(criteria),
        options,
      );

    rows = this._mapUserForTenantForRows(
      rows,
      currentTenant,
    );
    rows = await Promise.all(
      rows.map((row) =>
        this._fillRelationsAndFileDownloadUrls(
          row,
          options,
          true,
        ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    roles = [],
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
        builtin: false,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            fullName: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
          {
            email: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    if (roles && roles.length) {
      criteriaAnd.push({
        tenants: { $elemMatch: { roles: { $in: roles } } },
      });
    }

    const sort = MongooseQueryUtils.sort('fullName_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    let rows =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .find(criteria)
          .limit(limitEscaped)
          .sort(sort)
          .populate('avatars')
          .select([
            '_id',
            'avatars',
            'firstName',
            'lastName',
            'fullName',
            'email',
          ]),
        options,
      );

    rows = await Promise.all(
      rows.map(async (row) => {
        const user =
          await this._fillRelationsAndFileDownloadUrls(
            row,
            options,
            true,
          );

        return {
          id: user.id,
          label: getUserNameOrEmailPrefix(user),
          avatar:
            user.avatars &&
            user.avatars.length &&
            user.avatars[0].downloadUrl
              ? user.avatars[0].downloadUrl
              : null,
        };
      }),
    );

    return rows;
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
      return ids;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let users = await User(options.database)
      .find({
        _id: {
          $in: ids,
        },
        tenants: {
          $elemMatch: { tenant: currentTenant.id },
        },
      })
      .select(['_id']);

    return users.map((user) => user._id);
  }

  static async findByIdWithPassword(
    id,
    options: IRepositoryOptions,
  ) {
    return await MongooseRepository.wrapWithSessionIfExists(
      User(options.database)
        .findById(id)
        .populate('avatars')
        .populate('tenants.tenant'),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .populate({
            path: 'createdBy',
            populate: ['avatars'].join(' '),
          })
          .populate('avatars')
          .populate('tenants.tenant'),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    if (!options || !options.bypassPermissionValidation) {
      if (!isUserInTenant(record, currentTenant.id)) {
        throw new Error404();
      }

      record = this._mapUserForTenant(
        record,
        currentTenant,
      );
    }

    record = await this._fillRelationsAndFileDownloadUrls(
      record,
      options,
      metaOnly,
    );

    return record;
  }

  static async findPassword(
    id,
    options: IRepositoryOptions,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .select('+password'),
        options,
      );

    if (!record) {
      return null;
    }

    return record.password;
  }

  static async findByIdWithoutAvatar(
    id,
    options: IRepositoryOptions,
  ) {
    return this.findById(id, options);
  }

  /**
   * Finds the user by the password token if not expired.
   */
  static async findByPasswordResetToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: { $gt: Date.now() },
      }),
      options,
    );
  }

  /**
   * Finds the user by the email verification token if not expired.
   */
  static async findByEmailVerificationToken(
    token,
    options: IRepositoryOptions,
  ) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiresAt: {
          $gt: Date.now(),
        },
      }),
      options,
    );
  }

  static async markEmailVerified(
    id,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    await User(options.database).updateOne(
      { _id: id },
      {
        emailVerified: true,
        updatedBy: currentUser.id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          emailVerified: true,
        },
      },
      options,
    );

    return true;
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      User(options.database).countDocuments(filter),
      options,
    );
  }

  /**
   * Normalize the user fields.
   */
  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }

  /**
   * Maps the users data to show only the current tenant related info
   */
  static _mapUserForTenantForRows(rows, tenant) {
    if (!rows) {
      return rows;
    }

    return rows.map((record) =>
      this._mapUserForTenant(record, tenant),
    );
  }

  /**
   * Maps the user data to show only the current tenant related info
   */
  static _mapUserForTenant(user, tenant) {
    if (!user || !user.tenants) {
      return user;
    }

    const tenantUser = user.tenants.find(
      (tenantUser) =>
        tenantUser &&
        tenantUser.tenant &&
        String(tenantUser.tenant.id) === String(tenant.id),
    );

    delete user.tenants;

    const status = tenantUser ? tenantUser.status : null;
    const roles = tenantUser ? tenantUser.roles : [];

    // If the user is only invited,
    // tenant members can only see its email
    // const otherData =
    //   status === 'invited' ? {} : user.toObject();
    const otherData = user.toObject();

    return {
      ...otherData,
      id: user.id,
      email: user.email,
      roles,
      status,
    };
  }

  static async _fillRelationsAndFileDownloadUrls(
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

    output.avatars =
      await FileRepository.cleanupForRelationships(
        output.avatars,
        options,
      );

    if (metaOnly) {
      return output;
    }

    if (output.tenants && output.tenants.length) {
      await Promise.all(
        output.tenants.map(async (userTenant) => {
          const session = {
            ...options,
            currentUser: { id: record.id },
            currentTenant: userTenant.tenant,
          };
          userTenant.tenant.settings =
            await SettingsRepository.find(session);
          userTenant.tenant.mui =
            await MuiRepository.findOrCreateDefault(
              session,
            );
          userTenant.tenant.defaultTaskPriority =
            await TaskPriorityRepositoryEx.defaultPriority(
              session,
            );
          userTenant.clients =
            await ClientRepository.findByUser(
              output.id,
              session,
            );
          userTenant.vendors =
            await VendorRepository.findByUser(
              output.id,
              session,
            );
        }),
      );
    }

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.clients = await ClientRepository.findByUser(
      output.id,
      options,
    );

    output.vendors = await VendorRepository.findByUser(
      output.id,
      options,
    );

    return output;
  }

  static async createFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options,
  ) {
    let data = {
      email,
      emailVerified,
      providerId,
      provider,
      firstName,
      lastName,
    };

    data = this._preSave(data);

    let [user] = await User(options.database).create(
      [data],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return this.findById(user.id, {
      ...options,
      bypassPermissionValidation: true,
    });
  }

  static REQUIRED_FIELDS = [
    '_id',
    'id',
    'firstName',
    'lastName',
    'email',
    'avatars',
  ];

  static async cleanupForRelationships(
    userOrUsers,
    options: IRepositoryOptions,
  ) {
    if (!userOrUsers) {
      return userOrUsers;
    }

    if (Array.isArray(userOrUsers)) {
      return await Promise.all(
        userOrUsers.map(async (user) => {
          return lodash.pick(
            {
              ...user,
              avatars:
                await FileRepository.cleanupForRelationships(
                  user.avatars,
                  options,
                  true,
                ),
            },
            this.REQUIRED_FIELDS,
          );
        }),
      );
    }

    return lodash.pick(
      {
        ...userOrUsers,
        avatars:
          await FileRepository.cleanupForRelationships(
            userOrUsers.avatars,
            options,
            true,
          ),
      },
      this.REQUIRED_FIELDS,
    );
  }

  static async toggles(
    userId,
    groupIds,
    doAssign,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findOne({
          _id: userId,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    let groups: any[] = [];

    if (doAssign) {
      groups = [
        ...new Set([
          ...record.tenants.find(
            ({ tenant }) =>
              tenant.toHexString() === currentTenant.id,
          )?.userGroups,
          ...groupIds,
        ]),
      ];
      await this.addGroup(groupIds, record.id, options);
    } else {
      groups =
        record.tenants
          .find(
            ({ tenant }) =>
              tenant.toHexString() === currentTenant.id,
          )
          ?.userGroups.filter(
            (group) =>
              !groupIds.some(
                (id) =>
                  id.toHexString() === group.toHexString(),
              ),
          ) || [];
      await this.removeGroup(groupIds, record.id, options);
    }

    await User(options.database).updateOne(
      {
        _id: userId,
        'tenants.tenant': currentTenant.id,
      },
      {
        'tenants.$.userGroups': groups,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: userId,
        action: AuditLogRepository.UPDATE,
        values: {
          tenant: currentTenant.id,
          userGroups: groups,
        },
      },
      options,
    );

    record = await this.findById(userId, options);

    return record;
  }

  static async addGroup(
    groups,
    userId,
    options: IRepositoryOptions,
  ) {
    if (!groups || !groups.length) {
      return;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await UserGroup(options.database).updateMany(
      {
        _id: { $in: groups },
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

  static async removeGroup(
    groups,
    userId,
    options: IRepositoryOptions,
  ) {
    if (!groups || !groups.length) {
      return;
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    await UserGroup(options.database).updateMany(
      {
        _id: { $in: groups },
        tenant: currentTenant.id,
      },
      {
        $pull: { users: userId },
      },
      options,
    );
  }
}
