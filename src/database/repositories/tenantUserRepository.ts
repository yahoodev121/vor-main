import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import CampaignInstance from '../models/campaignInstance';
import Client from '../models/client';
import crypto from 'crypto';
import EmailSender from '../../services/emailSender';
import MongooseRepository from './mongooseRepository';
import Policy from '../models/policy';
import PolicyInstance from '../models/policyInstance';
import Risk from '../models/risk';
import Roles from '../../security/roles';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import User from '../models/user';
import UserGroup from '../models/userGroup';
import UserRepository from './userRepository';
import Vendor from '../models/vendor';

export default class TenantUserRepository {
  static async findByInvitationToken(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    let user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findOne({
            tenants: { $elemMatch: { invitationToken } },
          })
          .populate('tenants.tenant'),
        options,
      );

    if (!user) {
      return null;
    }

    user = user.toObject ? user.toObject() : user;

    const tenantUser = user.tenants.find((userTenant) => {
      return userTenant.invitationToken === invitationToken;
    });

    return {
      ...tenantUser,
      user,
    };
  }

  static async create(
    tenant,
    user,
    roles,
    options: IRepositoryOptions,
  ) {
    roles = roles || [];
    const status = selectStatus('active', roles);

    await User(options.database).updateMany(
      { _id: user.id },
      {
        $push: {
          tenants: {
            tenant: tenant.id,
            status,
            roles,
          },
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          email: user.email,
          status,
          roles,
        },
      },
      options,
    );
  }

  static async activate(
    tenantId,
    id,
    options: IRepositoryOptions,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findById(id),
        options,
      );

    let status = 'active';

    const userTenant = (user.tenants ?? []).find(
      ({ tenant }) =>
        tenant?.toHexString().toLowerCase() ===
        tenantId.toLowerCase(),
    );

    if (userTenant && !userTenant.roles.length) {
      status = 'empty-permissions';
    }

    if (
      !user.password &&
      EmailSender.isConfigured &&
      !user.emailVerified
    ) {
      status = 'invited';
    }

    await User(options.database).updateOne(
      { _id: id, 'tenants.tenant': tenantId },
      {
        $set: {
          'tenants.$.status': status,
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status,
        },
      },
      options,
    );
  }

  static async deactivate(
    tenantId,
    id,
    options: IRepositoryOptions,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findById(id),
        options,
      );

    await User(options.database).updateOne(
      { _id: id, 'tenants.tenant': tenantId },
      {
        $set: {
          'tenants.$.status': 'inactive',
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: 'inactive',
        },
      },
      options,
    );
  }

  static async destroyRelationsToCampaignInstance(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToMany(
      id,
      CampaignInstance(options.database),
      'users',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      CampaignInstance(options.database),
      'submittedBy',
      options,
    );
  }

  static async destroyRelationsToClient(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToMany(
      id,
      Client(options.database),
      'users',
      options,
    );
  }

  static async destroyRelationsToPolicyAndInstance(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToOne(
      id,
      Policy(options.database),
      'publishedBy',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      PolicyInstance(options.database),
      'publishedBy',
      options,
    );
  }

  static async destroyRelationsToRisk(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToOne(
      id,
      Risk(options.database),
      'owner',
      options,
    );
  }

  static async destroyRelationsToTaskAndInstance(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToOne(
      id,
      Task(options.database),
      'owner',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Task(options.database),
      'approver',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      TaskInstance(options.database),
      'owner',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      TaskInstance(options.database),
      'approver',
      options,
    );
  }

  static async destroyRelationsToVendor(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToMany(
      id,
      Vendor(options.database),
      'users',
      options,
    );
  }

  static async destroyRelationsToUserGroup(
    id,
    options: IRepositoryOptions,
  ) {
    await MongooseRepository.destroyRelationToMany(
      id,
      UserGroup(options.database),
      'users',
      options,
    );
  }

  static async destroy(
    tenantId,
    id,
    options: IRepositoryOptions,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).findById(id),
        options,
      );

    await User(options.database).updateOne(
      { _id: id },
      {
        $pull: {
          tenants: { tenant: tenantId },
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.DELETE,
        values: {
          email: user.email,
        },
      },
      options,
    );

    await TenantUserRepository.destroyRelationsToCampaignInstance(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToClient(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToPolicyAndInstance(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToRisk(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToTaskAndInstance(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToVendor(
      id,
      options,
    );

    await TenantUserRepository.destroyRelationsToUserGroup(
      id,
      options,
    );
  }

  static async updateRoles(
    tenantId,
    id,
    roles,
    userGroups,
    options,
  ) {
    const user =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database)
          .findById(id)
          .populate('tenants.tenant'),
        options,
      );

    let tenantUser = user.tenants.find((userTenant) => {
      return userTenant.tenant.id === tenantId;
    });

    let isCreation = false;

    if (!tenantUser) {
      isCreation = true;
      tenantUser = {
        tenant: tenantId,
        status: selectStatus('invited', []),
        invitationToken: crypto
          .randomBytes(20)
          .toString('hex'),
        roles: [],
        userGroups: [],
      };

      await User(options.database).updateOne(
        { _id: id },
        {
          $push: {
            tenants: tenantUser,
          },
        },
        options,
      );
    }

    let { roles: existingRoles } = tenantUser;

    let newRoles = [] as Array<string>;

    if (options.addRoles) {
      newRoles = [...new Set([...existingRoles, ...roles])];
    } else if (options.removeOnlyInformedRoles) {
      newRoles = existingRoles.filter(
        (existingRole) => !roles.includes(existingRole),
      );
    } else {
      newRoles = roles || [];
    }

    tenantUser.roles = newRoles;
    tenantUser.status = selectStatus(
      tenantUser.status,
      newRoles,
    );

    await User(options.database).updateOne(
      { _id: id, 'tenants.tenant': tenantId },
      {
        $set: {
          'tenants.$.roles': newRoles,
          'tenants.$.status': tenantUser.status,
        },
      },
      options,
    );

    let { userGroups: existingUserGroups } = tenantUser;

    let newUserGroups = [] as Array<string>;

    if (options.addUserGroups) {
      newUserGroups = [
        ...new Set([...existingUserGroups, ...userGroups]),
      ];
    } else if (options.removeOnlyInformedUserGroups) {
      newUserGroups = existingUserGroups.filter(
        (existingUserGroup) =>
          !userGroups.includes(existingUserGroup),
      );
    } else {
      newUserGroups = userGroups || [];
    }

    const filteredUserGroups =
      Roles.filterUserGroupsByRoles(
        newUserGroups,
        newRoles,
      );

    tenantUser.userGroups = filteredUserGroups;

    await User(options.database).updateOne(
      { _id: id, 'tenants.tenant': tenantId },
      {
        $set: {
          'tenants.$.userGroups': filteredUserGroups,
        },
      },
      options,
    );

    const doAssignUserGroups =
      !Roles.hasBanUserGroupsRole(newRoles);

    await UserRepository.toggles(
      id,
      doAssignUserGroups
        ? filteredUserGroups
        : existingUserGroups,
      doAssignUserGroups,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: isCreation
          ? AuditLogRepository.CREATE
          : AuditLogRepository.UPDATE,
        values: {
          email: user.email,
          status: tenantUser.status,
          roles: newRoles,
        },
      },
      options,
    );

    return tenantUser;
  }

  static async acceptInvitation(
    invitationToken,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      MongooseRepository.getCurrentUser(options);

    // This tenant user includes the User data
    let invitationTenantUser =
      await this.findByInvitationToken(
        invitationToken,
        options,
      );

    let existingTenantUser = currentUser.tenants.find(
      (userTenant) =>
        String(userTenant.tenant.id) ===
        String(invitationTenantUser.tenant.id),
    );

    // destroys old invite just for sure
    await this.destroy(
      invitationTenantUser.tenant.id,
      invitationTenantUser.user.id,
      options,
    );

    const tenantUser = {
      tenant: invitationTenantUser.tenant.id,
      invitationToken: null,
      status: selectStatus(
        'active',
        invitationTenantUser.roles,
      ),
      roles: invitationTenantUser.roles,
    };

    // In case the user is already a member, should merge the roles
    if (existingTenantUser) {
      // Merges the roles from the invitation and the current tenant user
      tenantUser.roles = [
        ...new Set([
          ...existingTenantUser.roles,
          ...invitationTenantUser.roles,
        ]),
      ];
    }

    const isSameEmailFromInvitation =
      invitationTenantUser.user.id === currentUser.id;

    // Auto-verifies email if the invitation token matches the same email
    const emailVerified =
      currentUser.emailVerified ||
      isSameEmailFromInvitation;

    await User(options.database).updateOne(
      { _id: currentUser.id },
      {
        emailVerified,
        $push: {
          tenants: tenantUser,
        },
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: currentUser.id,
        action: AuditLogRepository.UPDATE,
        values: {
          email: currentUser.email,
          roles: tenantUser.roles,
          status: selectStatus('active', tenantUser.roles),
        },
      },
      options,
    );
  }
}

function selectStatus(oldStatus, newRoles) {
  newRoles = newRoles || [];

  if (['invited', 'inactive'].includes(oldStatus)) {
    return oldStatus;
  }

  if (!newRoles.length) {
    return 'empty-permissions';
  }

  return 'active';
}
