import { IRepositoryOptions } from '../IRepositoryOptions';
import Error404 from '../../../errors/Error404';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import MongooseRepository from '../mongooseRepository';
import ProjectStatus from '../../models/projectStatus';
import ProjectStatusRepository from '../projectStatusRepository';

class ProjectStatusRepositoryEx extends ProjectStatusRepository {
  static DEFAULT_STATUS = 'Not Started';
  static DEFAULT_STATUS_NAMES = [
    'Not Started',
    'On Track',
    'At Risk',
    'Off Track',
    'On Hold',
    'Complete',
  ];

  static async defaultStatus(options: IRepositoryOptions) {
    return await this.findByStatus(
      this.DEFAULT_STATUS,
      options,
    );
  }

  static async findByStatus(
    status,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProjectStatus(options.database).findOne({
          status: status,
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
      await ProjectStatusRepositoryEx.rawFindAndCountAll(
        {
          filter: {
            $in: ['$status', this.DEFAULT_STATUS_NAMES],
          },
        },
        options,
      );

    let order = 0;

    for (const statusName of this.DEFAULT_STATUS_NAMES) {
      if (
        defaultPriorities.rows.find(
          (status) => status.status === statusName,
        )
      ) {
        continue;
      }
      await ProjectStatusRepositoryEx.create(
        {
          status: statusName,
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

    let rows = await ProjectStatus(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectStatus(
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

export default ProjectStatusRepositoryEx;
