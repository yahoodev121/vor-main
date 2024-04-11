import { IServiceOptions } from '../IServiceOptions';
import assert from 'assert';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import Plans from '../../security/plans';
import Roles from '../../security/roles';
import TenantUserRepository from '../../database/repositories/tenantUserRepository';
import UserRepository from '../../database/repositories/userRepository';
import Error400 from '../../errors/Error400';

export default class UserDeactivator {
  options: IServiceOptions;
  session;
  data;

  constructor(options) {
    this.options = options;
  }

  async deactivateAll(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await Promise.all(
        this._ids.map((id) => this.deactivate(id)),
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

  async deactivate(id) {
    const user = await UserRepository.findByIdWithoutAvatar(
      id,
      this.options,
    );

    await TenantUserRepository.deactivate(
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

  /**
   * Checks if the user is removing the responsable for the plan
   */
  async _isRemovingPlanUser() {
    const currentTenant = this.options.currentTenant;

    if (currentTenant.plan === Plans.values.free) {
      return false;
    }

    if (!currentTenant.planUserId) {
      return false;
    }

    return this._ids.includes(
      String(currentTenant.planUserId),
    );
  }

  /**
   * Checks if the user with admin role is deactivating himself
   */
  _isRemovingHimself() {
    return this._ids.includes(
      String(this.options.currentUser.id),
    );
  }

  async _validate() {
    assert(
      this.options.currentTenant.id,
      'tenantId is required',
    );
    assert(
      this.options.currentUser,
      'currentUser is required',
    );
    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );
    assert(
      this._ids && this._ids.length,
      'ids is required',
    );

    if (await this._isRemovingPlanUser()) {
      throw new Error400(
        this.options.language,
        'user.errors.deactivatingPlanUser',
      );
    }

    if (this._isRemovingHimself()) {
      throw new Error400(
        this.options.language,
        'user.errors.deactivatingHimself',
      );
    }
  }
}
