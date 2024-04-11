import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import lodash from 'lodash';
import MongooseRepository from '../database/repositories/mongooseRepository';
import Policy from '../database/models/policy';
import PolicyInstance from '../database/models/policyInstance';
import PolicyInstanceRepository from '../database/repositories/policyInstanceRepository';
import PolicyRepository from '../database/repositories/policyRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';
import NoteRepository from '../database/repositories/noteRepository';

export default class PolicyService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async updateFromLastPublished(id) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    try {
      const { rows: policyInstances } =
        await PolicyInstanceRepository.findAndCountAll(
          {
            policy: id,
            filter: {},
            orderBy: 'version_DESC',
          },
          { ...this.options, session },
        );

      const availablePolicy =
        policyInstances.find((policyInstance) =>
          Boolean(policyInstance.lastPublishedDate),
        ) || policyInstances[0];

      const lastPolicy =
        await PolicyInstanceRepository.findById(
          availablePolicy.id,
          { ...this.options, session },
        );

      const record = await PolicyRepository.update(
        id,
        lodash.pick(lastPolicy, [
          'name',
          'type',
          'description',
          'attachment',
          'link',
          'notes',
          'version',
          'lastPublishedDate',
          'publishedBy',
        ]),
        { ...this.options, session },
      );

      await TagRefRepository.save(
        Policy,
        null,
        record.id,
        lastPolicy.tags.map((tag) => tag.id),
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
        'policy',
      );

      throw error;
    }
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.attachment =
        await FileRepository.filterIdsInTenant(
          data.attachment,
          { ...this.options, session },
        );
      data.notes = await NoteRepository.filterIdsInTenant(
        data.notes,
        { ...this.options, session },
      );

      data.version = 1;

      const record = await PolicyRepository.create(data, {
        ...this.options,
        session,
      });

      await TagRefRepository.save(
        Policy,
        null,
        record.id,
        data.tags,
        {
          ...this.options,
          session,
        },
      );

      data.policy = record.id;

      const policyInstance =
        await PolicyInstanceRepository.create(data, {
          ...this.options,
          session,
        });

      await TagRefRepository.save(
        PolicyInstance,
        null,
        policyInstance.id,
        data.tags,
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
        'policy',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.attachment =
        await FileRepository.filterIdsInTenant(
          data.attachment,
          { ...this.options, session },
        );
      data.notes = await NoteRepository.filterIdsInTenant(
        data.notes,
        { ...this.options, session },
      );

      if (!data.version) {
        const policy = await PolicyRepository.findById(id, {
          ...this.options,
          session,
        });
        data.version = policy.version;
      }

      const record = await PolicyInstanceRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        PolicyInstance,
        null,
        record.id,
        data.tags,
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
        'policy',
      );

      throw error;
    }
  }

  async clone(id, version) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    try {
      let result = {};
      const editableVersions =
        await PolicyInstanceRepository.count(
          {
            policy: id,
            lastPublishedDate: undefined,
          },
          { ...this.options, session },
        );
      if (editableVersions) {
        throw new Error400(
          this.options.language,
          'entities.policy.errors.update.clone',
        );
      }
      const record =
        await PolicyInstanceRepository.findByPolicyVersion(
          id,
          version,
          { ...this.options, session },
        );

      if (record.lastPublishedDate) {
        const newPolicyInstance =
          await PolicyInstanceRepository.create(
            {
              ...lodash.pick(record, [
                'policy',
                'name',
                'type',
                'description',
                'attachment',
                'link',
              ]),
              version:
                await PolicyInstanceRepository.newVersionByPolicy(
                  id,
                  { ...this.options, session },
                ),
            },
            { ...this.options, session },
          );

        await TagRefRepository.save(
          PolicyInstance,
          null,
          newPolicyInstance.id,
          record.tags.map((tag) => tag.id),
          {
            ...this.options,
            session,
          },
        );

        result = {
          id: newPolicyInstance.policy,
          version: newPolicyInstance.version,
        };
      }

      await MongooseRepository.commitTransaction(session);

      return result;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'policy',
      );

      throw error;
    }
  }

  async publish(id, version) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    try {
      const record = await PolicyInstanceRepository.publish(
        id,
        version,
        { ...this.options, session },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'policy',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const record = await PolicyRepository.findById(
      id,
      this.options,
    );

    const policyInstance =
      await PolicyInstanceRepository.findByPolicyVersion(
        id,
        record.version,
        this.options,
      );

    await new TagRefService(this.options).save(
      Policy,
      record.id,
      data.tags,
    );

    await new TagRefService(this.options).save(
      PolicyInstance,
      policyInstance.id,
      data.tags,
    );

    return record;
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const result: boolean[] = [];

      for (const id of ids) {
        result.push(
          await PolicyRepository.destroy(id, {
            ...this.options,
            session,
          }),
        );
      }

      await MongooseRepository.commitTransaction(session);

      return result;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return await PolicyRepository.findById(
      id,
      this.options,
    );
  }

  async findByVersion(id, version) {
    return await PolicyInstanceRepository.findByPolicyVersion(
      id,
      version,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return await PolicyRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return await PolicyRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async versionFindAndCountAll(policy, args) {
    return await PolicyInstanceRepository.findAndCountAll(
      { ...args, policy },
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
    const count = await PolicyRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
