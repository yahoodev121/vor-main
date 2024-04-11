import { IRepositoryOptions } from './IRepositoryOptions';
import MongooseRepository from './mongooseRepository';
import Roles from '../../security/roles';
import User from '../models/user';

export default class RoleRepository {
  static async countByRole(
    role,
    options: IRepositoryOptions,
  ) {
    if (!Roles.values[role]) {
      return 0;
    }
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);
    const count =
      await MongooseRepository.wrapWithSessionIfExists(
        User(options.database).countDocuments({
          'tenants.tenant': currentTenant.id,
          'tenants.roles': Roles.values[role],
          builtin: false,
        }),
        options,
      );
    return count ?? 0;
  }

  static async addRole(
    users,
    role,
    options: IRepositoryOptions,
  ) {
    if (!users || !users.length || !Roles.values[role]) {
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
          'tenants.$.roles': Roles.values[role],
        },
      },
      options,
    );
  }

  static async removeRole(
    users,
    role,
    options: IRepositoryOptions,
  ) {
    if (!users || !users.length || !Roles.values[role]) {
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
        $pull: { 'tenants.$.roles': Roles.values[role] },
      },
      options,
    );
  }
}
