import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import FileRepository from '../database/repositories/fileRepository';
import moment from 'moment';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NoteRepository from '../database/repositories/noteRepository';
import Project from '../database/models/project';
import ProjectPriorityRepository from '../database/repositories/projectPriorityRepository';
import ProjectRepository from '../database/repositories/projectRepository';
import ProjectStatusRepository from '../database/repositories/projectStatusRepository';
import ProjectTypeRepository from '../database/repositories/projectTypeRepository';
import ReferenceRepository from '../database/repositories/referenceRepository';
import RiskRepository from '../database/repositories/riskRepository';
import TaskRepository from '../database/repositories/taskRepository';
import UserGroupRepository from '../database/repositories/userGroupRepository';
import UserRepository from '../database/repositories/userRepository';

export default class ProjectService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.owner = await UserRepository.filterIdInTenant(
      data.owner,
      { ...this.options, session },
    );
    const status = await ProjectStatusRepository.findById(
      data.status,
      { ...this.options, session },
    );
    if (status?.status !== 'Complete') {
      data.completedDate = null;
    }

    if (
      !data.completedDate &&
      status?.status === 'Complete'
    ) {
      data.completedDate = moment();
    }
    data.status = status?.id;
    data.type =
      await ProjectTypeRepository.filterIdInTenant(
        data.type,
        { ...this.options, session },
      );
    data.priority =
      await ProjectPriorityRepository.filterIdInTenant(
        data.priority,
        { ...this.options, session },
      );
    data.teamMembers =
      await UserRepository.filterIdsInTenant(
        data.teamMembers,
        { ...this.options, session },
      );
    data.teamGroups =
      await UserGroupRepository.filterIdsInTenant(
        data.teamGroups,
        { ...this.options, session },
      );
    data.tasks = await TaskRepository.filterIdsInTenant(
      data.tasks,
      { ...this.options, session },
    );
    data.risks = await RiskRepository.filterIdsInTenant(
      data.risks,
      { ...this.options, session },
    );
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
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
      data.reference =
        await ReferenceRepository.getNextReference(
          Project,
          this.options,
        );

      await this.assignRelatedData(data, session);

      const record = await ProjectRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'project',
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

      const record = await ProjectRepository.update(
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
        'project',
      );

      throw error;
    }
  }

  async addTaskOrRisk(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      const record = await ProjectRepository.update(
        id,
        {
          tasks: data.tasks,
          risks: data.risks,
        },
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
        'project',
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
        await ProjectRepository.destroy(id, {
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
    return ProjectRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ProjectRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProjectRepository.findAndCountAll(
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

    if (data.reference ?? false) {
      delete data.reference;
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await ProjectRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
