import { IServiceOptions } from './IServiceOptions';
import ClientRepository from '../database/repositories/clientRepository';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import HighlightRepository from '../database/repositories/highlightRepository';
import lodash from 'lodash';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NewsArticleRepository from '../database/repositories/newsArticleRepository';
import NoteRepository from '../database/repositories/noteRepository';
import PolicyRepository from '../database/repositories/policyRepository';
import PolicyTemplateRepository from '../database/repositories/policyTemplateRepository';
import ProductRepository from '../database/repositories/productRepository';
import ProgramControlRepository from '../database/repositories/programControlRepository';
import ProjectRepository from '../database/repositories/projectRepository';
import ReferenceRepository from '../database/repositories/referenceRepository';
import RiskRepository from '../database/repositories/riskRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';
import Task from '../database/models/task';
import TaskInstanceRepositoryEx from '../database/repositories/extend/taskInstanceRepositoryEx';
import TaskListRepository from '../database/repositories/taskListRepository';
import TaskPriorityRepository from '../database/repositories/taskPriorityRepository';
import TaskRepository from '../database/repositories/taskRepository';
import UserRepository from '../database/repositories/userRepository';
import VendorRepository from '../database/repositories/vendorRepository';

export default class TaskService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.taskList =
      await TaskListRepository.replaceIdsInTenant(
        data.taskList,
        { ...this.options, session },
      );
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
      { ...this.options, session },
    );
    data.priority =
      await TaskPriorityRepository.replaceIdInTenant(
        data.priority,
        { ...this.options, session },
      );
    data.owner = await UserRepository.filterIdInTenant(
      data.owner,
      { ...this.options, session },
    );
    data.approver = await UserRepository.filterIdInTenant(
      data.approver,
      { ...this.options, session },
    );
    data.highlights =
      await HighlightRepository.filterIdsInTenant(
        data.highlights,
        { ...this.options, session },
      );
    data.newsArticles =
      await NewsArticleRepository.filterIdsInTenant(
        data.newsArticles,
        { ...this.options, session },
      );
    data.products =
      await ProductRepository.filterIdsInTenant(
        data.products,
        { ...this.options, session },
      );
    data.projects =
      await ProjectRepository.filterIdsInTenant(
        data.projects,
        { ...this.options, session },
      );
    data.policyTemplates =
      await PolicyTemplateRepository.filterIdsInTenant(
        data.policyTemplates,
        { ...this.options, session },
      );
    data.policies =
      await PolicyRepository.filterIdsInTenant(
        data.policies,
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
          Task,
          this.options,
        );

      await this.assignRelatedData(data, session);

      const record = await TaskRepository.create(data, {
        ...this.options,
        session,
      });

      await ClientRepository.addTask(
        data.clients,
        record.id,
        {
          ...this.options,
          session,
        },
      );

      await RiskRepository.addTask(data.risks, record.id, {
        ...this.options,
        session,
      });

      await VendorRepository.addTask(
        data.vendors,
        record.id,
        {
          ...this.options,
          session,
        },
      );

      await ProgramControlRepository.addTask(
        data.controls,
        record.id,
        { ...this.options, session },
      );

      if (record.dueDate) {
        await TaskInstanceRepositoryEx.createDefaults(
          data,
          record,
          {
            ...this.options,
            session,
          },
        );
      }

      await this.updateForRepeatNever(
        {
          ...data,
          id: record.id,
          reference: record.reference,
        },
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Task,
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
        'task',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const oldRecord = await TaskRepository.findById(id, {
        ...this.options,
        session,
      });

      await this.assignRelatedData(data, session);

      const record = await TaskRepository.update(id, data, {
        ...this.options,
        session,
      });

      await ClientRepository.addTask(data.clients, id, {
        ...this.options,
        session,
      });

      await RiskRepository.addTask(data.risks, id, {
        ...this.options,
        session,
      });

      await VendorRepository.addTask(data.vendors, id, {
        ...this.options,
        session,
      });

      await ProgramControlRepository.addTask(
        data.controls,
        id,
        { ...this.options, session },
      );

      if (!oldRecord.dueDate && record.dueDate) {
        await TaskInstanceRepositoryEx.createDefaults(
          lodash.pick(record, TaskRepository.ALL_FIELDS),
          record,
          {
            ...this.options,
            session,
          },
        );
      }

      await this.updateForRepeatNever(
        {
          ...data,
          id: record.id,
          reference: record.reference,
        },
        {
          ...this.options,
          session,
        },
      );

      await TaskInstanceRepositoryEx.updateFutureInstance(
        record.id,
        {
          status: record.status,
        },
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Task,
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
        'task',
      );

      throw error;
    }
  }

  async updateForRepeatNever(record, options) {
    if (record.repeat === 'Never') {
      await TaskInstanceRepositoryEx.destroyMany(
        {
          task: record.id,
        },
        options,
      );
      await TaskInstanceRepositoryEx.create(
        {
          ...lodash.pick(record, TaskRepository.ALL_FIELDS),
          task: record.id,
        },
        options,
      );
    }
  }

  async tags(id, data) {
    const dbId = await TaskRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Task,
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
        await TaskRepository.destroy(id, {
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
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await TaskRepository.findById(id, {
        ...this.options,
        session,
      });

      const risks = await RiskRepository.findForLinks(id, {
        ...this.options,
        session,
      });

      const vendors = await VendorRepository.findForLinks(
        id,
        { ...this.options, session },
      );

      const clients = await ClientRepository.findForLinks(
        id,
        { ...this.options, session },
      );

      const controls =
        await ProgramControlRepository.findForLinks(id, {
          ...this.options,
          session,
        });

      await MongooseRepository.commitTransaction(session);

      return {
        ...record,
        risks,
        vendors,
        clients,
        controls,
      };
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findAllAutocomplete(search, limit) {
    return TaskRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return TaskRepository.findAndCountAll(
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
    const count = await TaskRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }

  async countTasksByUser(userId = null) {
    return {
      open: await TaskRepository.countOpenByUser(
        this.options,
        userId,
      ),
      overdue: await TaskRepository.countOverdueByUser(
        this.options,
        userId,
      ),
      requireReview:
        await TaskRepository.countRequireReviewByUser(
          this.options,
          userId,
        ),
    };
  }
}
