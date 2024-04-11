import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NoteRepository from '../database/repositories/noteRepository';
import ProgramControlRepository from '../database/repositories/programControlRepository';
import ProgramRepository from '../database/repositories/programRepository';
import ProgramRequirement from '../database/models/programRequirement';
import ProgramRequirementRepository from '../database/repositories/programRequirementRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';

export default class ProgramRequirementService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.programs =
      await ProgramRepository.filterIdsInTenant(
        data.programs,
        { ...this.options, session },
      );

    data.controls =
      await ProgramControlRepository.filterIdsInTenant(
        data.controls,
        { ...this.options, session },
      );

    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
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
        await ProgramRequirementRepository.create(data, {
          ...this.options,
          session,
        });

      await TagRefRepository.save(
        ProgramRequirement,
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
        'programRequirement',
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
        await ProgramRequirementRepository.update(
          id,
          data,
          {
            ...this.options,
            session,
          },
        );

      await TagRefRepository.save(
        ProgramRequirement,
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
        'programRequirement',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId =
      await ProgramRequirementRepository.filterIdInTenant(
        id,
        this.options,
      );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      ProgramRequirement,
      dbId,
      data.tags,
    );

    return dbId;
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await ProgramRequirementRepository.destroy(id, {
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
    return ProgramRequirementRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProgramRequirementRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramRequirementRepository.findAndCountAll(
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

    data.programs =
      await ProgramRepository.filterIdsByNames(
        data.programs,
        { ...this.options },
      );

    if (data.programs.length == 0) {
      throw new Error400(
        this.options.language,
        'importer.errors.importProgramNotExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await ProgramRequirementRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
