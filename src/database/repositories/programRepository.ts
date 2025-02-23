import {
  emptyTotalControlHealth,
  summarizeRequirement,
} from '../../utils/programRequirementUtils';
import { IRepositoryOptions } from './IRepositoryOptions';
import {
  ProgramStatusMap,
  summarizeRequirementHealth,
} from '../../utils/programUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import NoteRepository from './noteRepository';
import Program from '../models/program';
import ProgramControlRepository from './programControlRepository';
import ProgramRequirement from '../models/programRequirement';
import ProgramRequirementRepository from './programRequirementRepository';
import TagRefRepository from './tagRefRepository';
import UserRepository from './userRepository';

class ProgramRepository {
  static async _updateRelationships(
    data,
    options: IRepositoryOptions,
  ) {
    const models = {
      requirements: ProgramRequirement,
    };
    for (const sourceAttr of Object.keys(models)) {
      await MongooseRepository.refreshTwoWayRelationManyToMany(
        data,
        sourceAttr,
        models[sourceAttr](options.database),
        'programs',
        options,
      );
    }
  }

  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Program(options.database).create(
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
        Program(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Program(options.database).updateOne(
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

    await this.updateStatusById(id, options);

    record = await this.findById(id, options);

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Program(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Program(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      ProgramRequirement(options.database),
      'programs',
      options,
    );

    await TagRefRepository.destroy(
      Program,
      null,
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

    const records = await Program(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdsByNames(
    names,
    options: IRepositoryOptions,
  ) {
    if (!names || !names.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Program(options.database)
      .find({
        name: { $in: names },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async filterIdsHaveRequirement(
    requirementId,
    options: IRepositoryOptions,
  ) {
    if (!requirementId) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Program(options.database)
      .find({
        requirements: requirementId,
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    return MongooseRepository.wrapWithSessionIfExists(
      Program(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    skip404 = false,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Program(options.database)
          .findOne({
            _id: id,
            tenant: currentTenant.id,
          })
          .populate({
            path: 'requirements',
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
      if (skip404) {
        return null;
      }
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
      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        { _id: 'id' },
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['name', 'description'],
      );

      MongooseQueryUtils.pushEqualCriteria(
        criteriaAnd,
        filter,
        ['status'],
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
              Program,
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

    let rows = await Program(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate({
        path: 'requirements',
        select: [
          '_id',
          'requirementID',
          'name',
          'tenant',
          'controls',
        ],
        populate: {
          path: 'controls',
          model: 'programControl',
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
        },
      });

    const count = await Program(
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
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('name_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Program(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.name,
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
        entityName: Program(options.database).modelName,
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

    const output = record.toObject
      ? record.toObject()
      : record;

    output.totalRequirements =
      output.requirements?.length ?? 0;

    output.totalControls =
      output.requirements?.reduce(
        (total, { controls }) =>
          total + controls?.length ?? 0,
        0,
      ) ?? 0;

    output.requirements =
      output.requirements?.map(summarizeRequirement) ?? [];

    output.totalControlHealth =
      output.requirements.reduce(
        summarizeRequirementHealth,
        { ...emptyTotalControlHealth },
      ) ?? emptyTotalControlHealth;

    if (metaOnly) {
      return output;
    }

    output.tags = await TagRefRepository.assignTags(
      Program,
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

  static async updateStatusById(
    programId,
    options: IRepositoryOptions,
  ) {
    const {
      rows: [program],
    } = await ProgramRepository.findAndCountAll(
      { filter: { id: programId } },
      options,
    );
    if (!program) {
      return;
    }
    let status = 'noTasks';
    const healthStatus = program.totalControlHealth;
    for (const key of Object.keys(healthStatus)) {
      if ((healthStatus[status] ?? 0) < healthStatus[key]) {
        status = key;
      }
    }
    await Program(options.database).updateOne(
      { _id: programId },
      { status: ProgramStatusMap[status] },
      options,
    );
  }

  static async updateStatusFromRequirement(
    requirementId,
    options: IRepositoryOptions,
  ) {
    if (!requirementId) {
      return;
    }
    const requirements =
      await ProgramRepository.filterIdsHaveRequirement(
        requirementId,
        options,
      );
    await Promise.all(
      requirements.map(
        async (id) =>
          await ProgramRepository.updateStatusById(
            id,
            options,
          ),
      ),
    );
  }

  static async updateStatusFromControl(
    controlId,
    options: IRepositoryOptions,
  ) {
    if (!controlId) {
      return;
    }
    const requirements =
      await ProgramRequirementRepository.filterIdsHaveControl(
        controlId,
        options,
      );
    await Promise.all(
      requirements.map(
        async (id) =>
          await ProgramRepository.updateStatusFromRequirement(
            id,
            options,
          ),
      ),
    );
  }

  static async updateStatusFromTask(
    taskId,
    options: IRepositoryOptions,
  ) {
    if (!taskId) {
      return;
    }
    const controls =
      await ProgramControlRepository.filterIdsHaveTask(
        taskId,
        options,
      );
    await Promise.all(
      controls.map(
        async (id) =>
          await ProgramRepository.updateStatusFromControl(
            id,
            options,
          ),
      ),
    );
  }
}

export default ProgramRepository;
