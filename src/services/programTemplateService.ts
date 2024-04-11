import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import ProgramRequirementTemplateRepository from '../database/repositories/programRequirementTemplateRepository';
import ProgramTemplateRepository from '../database/repositories/programTemplateRepository';
import ProgramControlTemplateRepository from '../database/repositories/programControlTemplateRepository';

export default class ProgramTemplateService {
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
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await ProgramTemplateRepository.create(
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
        'programTemplate',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await ProgramTemplateRepository.update(
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
        'programTemplate',
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
        await ProgramTemplateRepository.destroy(id, {
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
    return ProgramTemplateRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProgramTemplateRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramTemplateRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async findAndCountAll4MetaList() {
    return ProgramTemplateRepository.findAndCountAll(
      { filter: null },
      this.options,
      true,
      [
        'id',
        'name',
        'description',
        'totalRequirementTemplates',
        'totalControlTemplates',
      ],
    );
  }

  async summarizingFromRequirements(data) {
    const requirementIDs =
      await ProgramRequirementTemplateRepository.filterIdsInTenant(
        data.requirements,
        this.options,
      );
    if (!requirementIDs || !requirementIDs.length) {
      return {
        requirements: 0,
        controls: 0,
      };
    }
    let controls = 0;
    for (const requirementId of requirementIDs) {
      if (data.controls[requirementId]) {
        const controlIds =
          await ProgramControlTemplateRepository.filterIdsInTenant(
            data.controls[requirementId],
            this.options,
          );
        controls += controlIds?.length ?? 0;
      }
    }
    return {
      requirements: requirementIDs.length,
      controls,
    };
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
    const count = await ProgramTemplateRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
