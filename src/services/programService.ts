import { IServiceOptions } from './IServiceOptions';
import { safePick } from '../utils/objectUtils';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import MongooseRepository from '../database/repositories/mongooseRepository';
import NoteRepository from '../database/repositories/noteRepository';
import Program from '../database/models/program';
import ProgramControlRepository from '../database/repositories/programControlRepository';
import ProgramControlTemplateRepository from '../database/repositories/programControlTemplateRepository';
import ProgramRepository from '../database/repositories/programRepository';
import ProgramRequirementRepository from '../database/repositories/programRequirementRepository';
import ProgramRequirementTemplateRepository from '../database/repositories/programRequirementTemplateRepository';
import ReferenceRepository from '../database/repositories/referenceRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';

export default class ProgramService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async assignRelatedData(data, session) {
    data.notes = await NoteRepository.filterIdsInTenant(
      data.notes,
      { ...this.options, session },
    );
    data.requirements =
      await ProgramRequirementRepository.filterIdsInTenant(
        data.requirements,
        { ...this.options, session },
      );
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );
    const repositoryOptions = { ...this.options, session };

    try {
      data.reference =
        await ReferenceRepository.getNextReference(
          Program,
          repositoryOptions,
        );

      const requirementTemplateIds =
        await ProgramRequirementTemplateRepository.filterIdsInTenant(
          data.requirements,
          repositoryOptions,
        );

      delete data.requirements;

      const controlsGroup = {};

      for (const requirementTemplateId of requirementTemplateIds) {
        controlsGroup[requirementTemplateId] =
          await ProgramControlTemplateRepository.filterIdsInTenant(
            data.controls[requirementTemplateId],
            repositoryOptions,
          );
      }

      delete data.controls;

      data.status = 'NoTasks';

      const record = await ProgramRepository.create(
        data,
        repositoryOptions,
      );

      const programs = [record.id];

      const controlIdsMap: { [key: string]: string } = {};

      const fnCreateProgramControlFromTemplate = async (
        controlTemplateId,
      ) => {
        if (!!controlIdsMap[controlTemplateId]) {
          return controlIdsMap[controlTemplateId];
        }
        const controlTemplate =
          await ProgramControlTemplateRepository.findById(
            controlTemplateId,
            repositoryOptions,
            true,
          );
        if (!controlTemplate) {
          return null;
        }
        const control =
          await ProgramControlRepository.create(
            {
              ...safePick(controlTemplate, [
                'name',
                'description',
              ]),
            },
            repositoryOptions,
          );
        controlIdsMap[controlTemplateId] = control.id;
        return control.id;
      };

      const fnCreateProgramRequirementFromTemplate = async (
        requirementTemplateId,
      ) => {
        const requirementTemplate =
          await ProgramRequirementTemplateRepository.findById(
            requirementTemplateId,
            repositoryOptions,
            true,
          );

        if (!requirementTemplate) {
          return;
        }

        const controls: string[] = [];

        for (const controlTemplateId of controlsGroup[
          requirementTemplateId
        ] || []) {
          const entityId =
            await fnCreateProgramControlFromTemplate(
              controlTemplateId,
            );
          if (!entityId) {
            continue;
          }
          controls.push(entityId);
        }

        await ProgramRequirementRepository.create(
          {
            ...safePick(requirementTemplate, [
              'requirementID',
              'name',
              'description',
            ]),
            controls,
            programs,
          },
          repositoryOptions,
        );
      };

      for (const requirementTemplateId of requirementTemplateIds) {
        await fnCreateProgramRequirementFromTemplate(
          requirementTemplateId,
        );
      }

      await TagRefRepository.save(
        Program,
        null,
        record.id,
        data.tags,
        repositoryOptions,
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'program',
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

      const record = await ProgramRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Program,
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
        'program',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await ProgramRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Program,
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
        await ProgramRepository.destroy(id, {
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
    return ProgramRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return ProgramRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ProgramRepository.findAndCountAll(
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
    const count = await ProgramRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
