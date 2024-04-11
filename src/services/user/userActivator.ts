import { IServiceOptions } from '../IServiceOptions';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import UserRepository from '../../database/repositories/userRepository';

export default class UserActivator {
  options: IServiceOptions;
  session;
  data;

  constructor(options) {
    this.options = options;
  }

  async activateAll(data) {
    this.data = data;

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await Promise.all(
        this._ids.map((id) => this.activate(id)),
      );

      return MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }
  }

  async activate(id) {
    const user = await UserRepository.findByIdWithoutAvatar(
      id,
      this.options,
    );

    await TenantUserRepository.activate(
      this.options.currentTenant.id,
      user.id,
      this.options,
    );
  }

  get _ids() {
    let ids;

    if (this.data.ids && !Array.isArray(this.data.ids)) {
      ids = [this.data.ids];
    } else {
      const uniqueIds = [...new Set(this.data.ids)];
      ids = uniqueIds;
    }

    return ids.map((id) => id.trim());
  }
}
