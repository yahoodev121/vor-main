import { IServiceOptions } from './IServiceOptions';
import CampaignInstanceRepository from '../database/repositories/campaignInstanceRepository';
import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import moment from 'moment';
import CampaignRepository from '../database/repositories/campaignRepository';
import FileRepository from '../database/repositories/fileRepository';

export default class CampaignInstanceService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record =
        await CampaignInstanceRepository.create(data, {
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
        'campaignInstance',
      );

      throw error;
    }
  }

  async calcProgress(questionnaire) {
    if (!questionnaire) {
      return 0;
    }
    let answers = 0;
    let questions = 0;
    for (const section of questionnaire.sections || []) {
      answers += section.answers ?? 0;
      questions += section.questions ?? 0;
    }
    return Math.round(
      (100 * (answers || 0)) / (questions || 100),
    );
  }

  async calcScore(
    questionnaire,
    field: string | null = null,
  ) {
    if (!questionnaire || !field) {
      return 0;
    }
    return (questionnaire.sections ?? []).reduce(
      (total, section) => total + (section[field] ?? 0),
      0,
    );
  }

  async assignRelatedData(data, session) {
    data.progress = await this.calcProgress(
      data.questionnaire,
    );
    const tScore = await this.calcScore(
      data.questionnaire,
      'totalScore',
    );
    const aScore = await this.calcScore(
      data.questionnaire,
      'answerScore',
    );
    data.score = Math.round(
      (100 * (aScore || 0)) / (tScore || 100),
    );

    const filterAttachments = async (entity) => {
      if (!entity) {
        return;
      }
      if (!entity.sections) {
        entity.sections = [];
      }
      if (!entity.questions) {
        entity.questions = {};
      }
      for (const section of entity.sections) {
        await filterAttachments(
          entity.questions[section.key],
        );
        if (!section.type || !section.attachment) {
          continue;
        }
        section.attachments =
          await FileRepository.filterIdsInTenant(
            section.attachments,
            { ...this.options, session },
          );
      }
    };

    await filterAttachments(data.questionnaire);
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      data.status = 'In Progress';

      const record =
        await CampaignInstanceRepository.update(id, data, {
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
        'campaignInstance',
      );

      throw error;
    }
  }

  async submit(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      await this.assignRelatedData(data, session);

      data.status = 'Completed';

      data.submittedDate = moment();

      data.submittedBy = MongooseRepository.getCurrentUser(
        this.options,
      ).id;

      const record =
        await CampaignInstanceRepository.update(id, data, {
          ...this.options,
          session,
        });

      const campaign = await CampaignRepository.findById(
        record.campaign,
        this.options,
      );

      const total =
        campaign.vendors?.length +
          campaign.clients?.length || 100;
      const submits =
        await CampaignInstanceRepository.count(
          {
            campaign: campaign.id,
            status: 'Completed',
          },
          this.options,
        );

      await CampaignRepository.progress(
        campaign.id,
        {
          progress: Math.round((100 * submits) / total),
          status:
            submits === total ? 'Completed' : 'In Progress',
        },
        { ...this.options, session },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'campaignInstance',
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
        await CampaignInstanceRepository.destroy(id, {
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
    return CampaignInstanceRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return CampaignInstanceRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return CampaignInstanceRepository.findAndCountAll(
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
    const count = await CampaignInstanceRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
