import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import ProgramControlTemplateRepository from '../database/repositories/programControlTemplateRepository';
import ProgramRequirementGuidanceTemplateRepository from '../database/repositories/programRequirementGuidanceTemplateRepository';
import ProgramRequirementTemplateRepository from '../database/repositories/programRequirementTemplateRepository';
import ProgramTemplateRepository from '../database/repositories/programTemplateRepository';

export default class ProgramRequirementTemplateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.programTemplates =
      await ProgramTemplateRepository.filterIdsInTenant(
        data.programTemplates,
        { ...this.options, session },
      );

    data.guidanceTemplates =
      await ProgramRequirementGuidanceTemplateRepository.filterIdsInTenant(
        data.guidanceTemplates,
        { ...this.options, session },
      );

    data.controlTemplates =
      await ProgramControlTemplateRepository.filterIdsInTenant(
        data.controlTemplates,
        { ...this.options, session },
      );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const record =
        await ProgramRequirementTemplateRepository.create(
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
        'programRequirementTemplate',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const record =
        await ProgramRequirementTemplateRepository.update(
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
        'programRequirementTemplate',
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
        await ProgramRequirementTemplateRepository.destroy(
          id,
          {
            ...this.options,
            session,
          },
        );
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return ProgramRequirementTemplateRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProgramRequirementTemplateRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramRequirementTemplateRepository.findAndCountAll(
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
    const count =
      await ProgramRequirementTemplateRepository.count(
        {
          importHash,
        },
        this.options,
      );

    return count > 0;
  }
}