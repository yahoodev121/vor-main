import { IRepositoryOptions } from './IRepositoryOptions';
import { summarizeRequirement } from '../../utils/programRequirementUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import Program from '../models/program';
import ProgramControl from '../models/programControl';
import ProgramRepository from './programRepository';
import ProgramRequirement from '../models/programRequirement';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import UserRepository from './userRepository';

class ProgramRequirementRepository {
  static async _updateRelationships(
    data,
    options: IRepositoryOptions,
  ) {
    const models = {
      programs: Program,
      controls: ProgramControl,
    };
    for (const sourceAttr of Object.keys(models)) {
      await MongooseRepository.refreshTwoWayRelationManyToMany(
        data,
        sourceAttr,
        models[sourceAttr](options.database),
        'requirements',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await ProgramRequirement(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
      ],
      options,
    );

    await this._updateRelationships(
      { _id: record._id, ...data },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await ProgramRepository.updateStatusFromRequirement(
      record.id,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramRequirement(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramRequirement(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._updateRelationships(
      { _id: record._id, ...data },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    await ProgramRepository.updateStatusFromRequirement(
      record.id,
      options,
    );

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramRequirement(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await ProgramRequirement(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    for (const model of [Program, ProgramControl, Risk]) {
      await MongooseRepository.destroyRelationToMany(
        id,
        model(options.database),
        'requirements',
        options,
      );
    }

    await TagRefRepository.destroy(
      ProgramRequirement,
      null,
      id,
      options,
    );

    await ProgramRepository.updateStatusFromRequirement(
      id,
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProgramRequirement(
      options.database,
    )
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdsByRequirementID(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProgramRequirement(
      options.database,
    )
      .find({
        requirementID: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdsHaveControl(
    controlId,
    options: IRepositoryOptions,
  ) {
    if (!controlId) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await ProgramRequirement(
      options.database,
    )
      .find({
        controls: controlId,
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      ProgramRequirement(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProgramRequirement(options.database)
          .findOne({ _id: id, tenant: currentTenant.id })
          .populate({
            path: 'programs',
            select: ['_id', 'name'],
          })
          .populate({
            path: 'controls',
            select: ['_id', 'name'],
          })
          .populate({
            path: 'notes',
            populate: ['createdBy'].join(' '),
          })
          .populate({
            path: 'createdBy',
            populate: ['avatars'].join(' '),
          }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
      false,
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: any = [];

    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (
        filter.contains === true ||
        filter.contains === 'true'
      ) {
        MongooseQueryUtils.pushInCriteria(
          criteriaAnd,
          filter,
          { _id: 'ids' },
          true,
        );
      }

      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        { _id: 'id' },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name', 'description', 'requirementID'],
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['createdAt'],
      );

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              ProgramRequirement,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await ProgramRequirement(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'programs',
        select: ['_id', 'name'],
      })
      .populate({
        path: 'controls',
        select: ['_id', 'name', 'tenant', 'tasks'],
        populate: {
          path: 'tasks',
          model: 'task',
          select: [
            '_id',
            'title',
            'repeat',
            'status',
            'completedDate',
            'dueDate',
          ],
        },
      });

    const count = await ProgramRequirement(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(
        async (row) =>
          await this._mapRelationshipsAndFillDownloadUrl(
            row,
            options,
          ),
      ),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    search,
    limit,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let criteriaAnd: Array<any> = [
      {
        tenant: currentTenant.id,
      },
    ];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            name: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
          {
            programs: {
              $in: [MongooseQueryUtils.uuid(search)],
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await ProgramRequirement(
      options.database,
    )
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.requirementID,
      label: `${record.requirementID} ${record.name}`,
    }));
  }

  static async _createAuditLog(
    action,
    id,
    data,
    options: IRepositoryOptions,
  ) {
    await AuditLogRepository.log(
      {
        entityName: ProgramRequirement(options.database)
          .modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = summarizeRequirement(
      record.toObject ? record.toObject() : record,
    );

    if (metaOnly) {
      return output;
    }

    output.tags = await TagRefRepository.assignTags(
      ProgramRequirement,
      null,
      output.id,
      options,
    );

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    output.notes =
      await NoteRepository.cleanupForRelationships(
        output.notes,
        options,
        false,
      );

    return output;
  }
}

export default ProgramRequirementRepository;
