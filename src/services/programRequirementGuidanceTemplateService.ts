import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import ProductCategoryRepository from '../database/repositories/productCategoryRepository';
import ProgramRequirementGuidanceTemplateRepository from '../database/repositories/programRequirementGuidanceTemplateRepository';
import ProgramRequirementTemplateRepository from '../database/repositories/programRequirementTemplateRepository';

export default class ProgramRequirementGuidanceTemplateService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.requirementTemplates =
      await ProgramRequirementTemplateRepository.filterIdsInTenant(
        data.requirementTemplates,
        { ...this.options, session },
      );
    data.productCategories =
      await ProductCategoryRepository.filterIdsInTenant(
        data.productCategories,
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
        await ProgramRequirementGuidanceTemplateRepository.create(
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
        'programRequirementGuidanceTemplate',
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
        await ProgramRequirementGuidanceTemplateRepository.update(
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
        'programRequirementGuidanceTemplate',
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
        await ProgramRequirementGuidanceTemplateRepository.destroy(
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
    return ProgramRequirementGuidanceTemplateRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProgramRequirementGuidanceTemplateRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramRequirementGuidanceTemplateRepository.findAndCountAll(
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
      await ProgramRequirementGuidanceTemplateRepository.count(
        {
          importHash,
        },
        this.options,
      );

    return count > 0;
  }
}
