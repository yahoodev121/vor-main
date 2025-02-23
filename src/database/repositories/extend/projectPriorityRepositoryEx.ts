import { IRepositoryOptions } from '../IRepositoryOptions';
import Error404 from '../../../errors/Error404';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import MongooseRepository from '../mongooseRepository';
import ProjectPriority from '../../models/projectPriority';
import ProjectPriorityRepository from '../projectPriorityRepository';

class ProjectPriorityRepositoryEx extends ProjectPriorityRepository {
  static DEFAULT_PRIORITY = 'Medium';
  static DEFAULT_PRIORITY_NAMES = [
    'None',
    'Low',
    'Medium',
    'High',
    'Critical',
  ];

  static async defaultPriority(
    options: IRepositoryOptions,
  ) {
    return await this.findByPriority(
      this.DEFAULT_PRIORITY,
      options,
    );
  }

  static async findByPriority(
    priority,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProjectPriority(options.database).findOne({
          priority: priority,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(
      record,
      options,
    );
  }

  static async buildUpDefaultRecords(
    options: IRepositoryOptions,
  ) {
    const defaultPriorities =
      await ProjectPriorityRepositoryEx.rawFindAndCountAll(
        {
          filter: {
            $in: ['$priority', this.DEFAULT_PRIORITY_NAMES],
          },
        },
        options,
      );

    let order = 0;

    for (const priorityName of this
      .DEFAULT_PRIORITY_NAMES) {
      if (
        defaultPriorities.rows.find(
          (priority) => priority.priority === priorityName,
        )
      ) {
        continue;
      }
      await ProjectPriorityRepositoryEx.create(
        {
          priority: priorityName,
          system: true,
          order,
        },
        options,
      );
      order++;
    }
  }

  static async rawFindAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const rawFilter = {
      $and: [
        {
          tenant: currentTenant.id,
        },
        filter,
      ],
    };

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    let rows = await ProjectPriority(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectPriority(
      options.database,
    ).countDocuments(rawFilter);

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
}

export default ProjectPriorityRepositoryEx;
