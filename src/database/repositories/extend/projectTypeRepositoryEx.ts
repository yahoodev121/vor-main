import { IRepositoryOptions } from '../IRepositoryOptions';
import Error404 from '../../../errors/Error404';
import MongooseQueryUtils from '../../utils/mongooseQueryUtils';
import MongooseRepository from '../mongooseRepository';
import ProjectType from '../../models/projectType';
import ProjectTypeRepository from '../projectTypeRepository';

class ProjectTypeRepositoryEx extends ProjectTypeRepository {
  static DEFAULT_TYPE = 'Project';
  static DEFAULT_TYPE_NAMES = [
    'Project',
    'Risk Assessment',
    'Audit',
    'Vendor',
    'Client',
    'Prospect',
    'Contract',
    'Policy',
    'Program',
    'Control',
    'Incident Response',
    'Vulnerability Management',
  ];

  static async defaultType(options: IRepositoryOptions) {
    return await this.findByType(
      this.DEFAULT_TYPE,
      options,
    );
  }

  static async findByType(
    type,
    options: IRepositoryOptions,
  ) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        ProjectType(options.database).findOne({
          type: type,
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
      await ProjectTypeRepositoryEx.rawFindAndCountAll(
        {
          filter: {
            $in: ['$type', this.DEFAULT_TYPE_NAMES],
          },
        },
        options,
      );

    let order = 0;

    for (const typeName of this.DEFAULT_TYPE_NAMES) {
      if (
        defaultPriorities.rows.find(
          (type) => type.type === typeName,
        )
      ) {
        continue;
      }
      await ProjectTypeRepositoryEx.create(
        {
          type: typeName,
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

    let rows = await ProjectType(options.database)
      .find(rawFilter)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);

    const count = await ProjectType(
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

export default ProjectTypeRepositoryEx;
