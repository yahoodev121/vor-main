import { IServiceOptions } from './IServiceOptions';
import Error400 from '../errors/Error400';
import Error404 from '../errors/Error404';
import FileRepository from '../database/repositories/fileRepository';
import Highlight from '../database/models/highlight';
import HighlightRepository from '../database/repositories/highlightRepository';
import lodash from 'lodash';
import MongooseRepository from '../database/repositories/mongooseRepository';
import TagRefRepository from '../database/repositories/tagRefRepository';
import TagRefService from './tagRefService';

export default class HighlightService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await HighlightRepository.create(
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Highlight,
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
        'highlight',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      const record = await HighlightRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await TagRefRepository.save(
        Highlight,
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
        'highlight',
      );

      throw error;
    }
  }

  async tags(id, data) {
    const dbId = await HighlightRepository.filterIdInTenant(
      id,
      this.options,
    );

    if (!dbId) {
      throw new Error404();
    }

    await new TagRefService(this.options).save(
      Highlight,
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
        await HighlightRepository.destroy(id, {
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
    return await HighlightRepository.findById(
      id,
      this.options,
    );
  }

  async findByFile(id) {
    return await HighlightRepository.findAndCountAll(
      { filter: { file: id } },
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return await HighlightRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return await HighlightRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async quick(fileId, highlights) {
    const file = await FileRepository.findById(
      fileId,
      this.options,
    );

    for (const highlight of highlights ?? []) {
      if (!highlight.id) {
        const record = await this.create({
          ...highlight,
          file: fileId,
          source: file.downloadUrl,
          client:
            file.type === FileRepository.TYPE_CLIENT
              ? file.typeId
              : null,
          vendor:
            file.type === FileRepository.TYPE_VENDOR
              ? file.typeId
              : null,
        });
        highlight.id = record.id;
      } else {
        await this.update(
          highlight.id,
          lodash.pick(highlight, [
            'title',
            'description',
            'tags',
          ]),
        );
      }
    }

    // const idsToDestroy =
    //   await HighlightRepository.filterIdsInFilter(
    //     {
    //       fileId,
    //       exceptIds: highlights
    //         .filter((hl) => Boolean(hl.id))
    //         .map((hl) => hl.id),
    //     },
    //     this.options,
    //   );

    // await this.destroyAll(idsToDestroy);

    return true;
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

    return await this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await HighlightRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
