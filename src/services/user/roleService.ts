import { IServiceOptions } from '../IServiceOptions';
import RoleRepository from '../../database/repositories/roleRepository';
import Roles from '../../security/roles';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';

export default class RoleService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async roleSummary() {
    const summary: any = {};
    for (const role of Object.keys(Roles.values)) {
      summary[role] = await RoleRepository.countByRole(
        role,
        this.options,
      );
    }
    return summary;
  }

  async usersWithRole(role) {
    return UserRepository.findWithRole(role, this.options);
  }

  async usersWithoutRole(role) {
    return UserRepository.findWithoutRole(
      role,
      this.options,
    );
  }

  async addRole(users, role) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await RoleRepository.addRole(users, role, {
        ...this.options,
        session,
      });
      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  async removeRole(users, role) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await RoleRepository.removeRole(users, role, {
        ...this.options,
        session,
      });
      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }
}
