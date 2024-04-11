import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import UserGroupRepository from '../database/repositories/userGroupRepository';
import UserRepository from '../database/repositories/userRepository';
import Roles from '../security/roles';

export default class UserGroupService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.users =
        (await UserRepository.filterIdsInTenant(
          data.users,
          { ...this.options, session },
        )) || [];

      const record = await UserGroupRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'userGroup',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      // data.users = await UserRepository.filterIdsInTenant(
      //   data.users,
      //   { ...this.options, session },
      // );
      delete data.users;

      const record = await UserGroupRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'userGroup',
      );

      throw error;
    }
  }

  async toggle(groupId, userId) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      groupId = await UserGroupRepository.filterIdInTenant(
        groupId,
        { ...this.options, session },
      );

      const user = await UserRepository.findById(userId, {
        ...this.options,
        session,
      });

      if (!user || Roles.hasBanUserGroupsRole(user.roles)) {
        throw new Error400(
          this.options.language,
          'errors.forbidden.message',
        );
      }

      const record = await UserGroupRepository.toggle(
        groupId,
        user._id,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'userGroup',
      );

      throw error;
    }
  }

  async toggles(groupId, userIds, doAssign) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      groupId = await UserGroupRepository.filterIdInTenant(
        groupId,
        { ...this.options, session },
      );

      userIds =
        (await UserRepository.filterIdsInTenant(userIds, {
          ...this.options,
          session,
        })) || [];

      const record = await UserGroupRepository.toggles(
        groupId,
        userIds,
        doAssign,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'userGroup',
      );

      throw error;
    }
  }

  async userToggles(userId, groupIds, doAssign) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const user = await UserRepository.findById(userId, {
        ...this.options,
        session,
      });

      if (!user || Roles.hasBanUserGroupsRole(user.roles)) {
        throw new Error400(
          this.options.language,
          'errors.forbidden.message',
        );
      }

      groupIds =
        (await UserGroupRepository.filterIdsInTenant(
          groupIds,
          {
            ...this.options,
            session,
          },
        )) || [];

      const record = await UserRepository.toggles(
        user.id,
        groupIds,
        doAssign,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'userGroup',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await UserGroupRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return UserGroupRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return UserGroupRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return UserGroupRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await UserGroupRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
