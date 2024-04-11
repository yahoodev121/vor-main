import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NoteRepository from '../database/repositories/noteRepository';
import ProgramControl from '../database/models/programControl';
import ProgramControlRepository from '../database/repositories/programControlRepository';
import ProgramRequirementRepository from '../database/repositories/programRequirementRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';
import TaskRepository from '../database/repositories/taskRepository';

export default class ProgramControlService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
      { ...this.options, session },
    );
    data.tasks = await TaskRepository.filterIdsInTenant(
      data.tasks,
      { ...this.options, session },
    );
    data.requirements =
      await ProgramRequirementRepository.filterIdsByRequirementID(
        data.requirements,
        { ...this.options, session },
      );
    data.attachments =
      await FileRepository.filterIdsInTenant(
        data.attachments,
        { ...this.options, session },
      );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const record = await ProgramControlRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        ProgramControl,
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
        'programControl',
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

      const record = await ProgramControlRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        ProgramControl,
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
        'programControl',
      );

      throw error;
    }
  }

  async addTasks(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.tasks = await TaskRepository.filterIdsInTenant(
        data.tasks,
        { ...this.options, session },
      );

      const record = await ProgramControlRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        ProgramControl,
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
        'programControl',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId =
      await ProgramControlRepository.filterIdInTenant(
        id,
        this.options,
      );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      ProgramControl,
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
        await ProgramControlRepository.destroy(id, {
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
    return ProgramControlRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return ProgramControlRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramControlRepository.findAndCountAll(
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

    const requirements =
      await ProgramRequirementRepository.filterIdsByRequirementID(
        data.requirements,
        { ...this.options },
      );

    if (requirements.length == 0) {
      throw new Error400(
        this.options.language,
        'importer.errors.importRequirementNotExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await ProgramControlRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
