import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import MongooseRepository from './mongooseRepository';
import Product from '../models/product';
import ProductFavoriteRepository from './productFavoriteRepository';
import Risk from '../models/risk';
import TagRefRepository from './tagRefRepository';
import Task from '../models/task';
import TaskInstance from '../models/taskInstance';
import UserRepository from './userRepository';

class ProductRepository {
  static async create(data, options: IRepositoryOptions) {
    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const currentUser =
      MongooseRepository.getCurrentUser(options);

    const [record] = await Product(options.database).create(
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
        Product(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Product(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy:
          MongooseRepository.getCurrentUser(options).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
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
        Product(options.database).findOne({
          _id: id,
          tenant: currentTenant.id,
        }),
        options,
      );

    if (!record) {
      throw new Error404();
    }

    await Product(options.database).deleteOne(
      { _id: id },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await ProductFavoriteRepository.destroyByProduct(
      id,
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Task(options.database),
      'products',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      TaskInstance(options.database),
      'products',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Risk(options.database),
      'products',
      options,
    );

    await TagRefRepository.destroy(
      Product,
      null,
      record.id,
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

    const records = await Product(options.database)
      .find({
        _id: { $in: ids },
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    return MongooseRepository.wrapWithSessionIfExists(
      Product(options.database).countDocuments({
        ...filter,
      }),
      options,
    );
  }

  static async findById(
    id,
    options: IRepositoryOptions,
    skip404 = false,
  ) {
    let record =
      await MongooseRepository.wrapWithSessionIfExists(
        Product(options.database)
          .findOne({ _id: id })
          .populate('category')
          .populate('logo')
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
    metaOnly = true,
  ) {
    let criteriaAnd: any = [];

    if (filter) {
      MongooseQueryUtils.pushEqualUUIDCriteria(
        criteriaAnd,
        filter,
        {
          _id: 'id',
          category: 'category',
        },
      );

      MongooseQueryUtils.pushRangeCriteria(
        criteriaAnd,
        filter,
        ['reference', 'rating', 'price', 'createdAt'],
      );

      MongooseQueryUtils.pushRegexCriteria(
        criteriaAnd,
        filter,
        ['title', 'website'],
      );

      if (
        filter.favorites === true ||
        filter.favorites === 'true'
      ) {
        criteriaAnd.push({
          _id: {
            $in: await ProductFavoriteRepository.productsInTenant(
              null,
              options,
            ),
          },
        });
      }

      if (filter.tags) {
        criteriaAnd.push({
          _id: {
            $in: await TagRefRepository.filterIds(
              Product,
              null,
              filter.tags,
              options,
            ),
          },
        });
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_ASC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows: any = [];

    if (!filter?.export && metaOnly) {
      rows = await Product(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate('logo');
    } else {
      rows = await Product(options.database)
        .find(criteria)
        .skip(skip)
        .limit(limitEscaped)
        .sort(sort)
        .populate('category')
        .populate('logo')
        .populate({
          path: 'createdBy',
          populate: ['avatars'].join(' '),
        });
    }

    const count = await Product(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(async (row) =>
        this._mapRelationshipsAndFillDownloadUrl(
          row,
          options,
          !filter?.export && metaOnly,
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
    let criteriaAnd: Array<any> = [];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            title: {
              $regex:
                MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            },
          },
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('title_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    const records = await Product(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort)
      .select(['_id', 'title']);

    return records.map((record) => ({
      id: record.id,
      label: record.title,
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
        entityName: Product(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(
    record,
    options,
    metaOnly = true,
  ) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.tags = await TagRefRepository.assignTags(
      Product,
      null,
      output.id,
      options,
    );

    output.favorite =
      await ProductFavoriteRepository.filterIdByProduct(
        output.id,
        options,
      );

    output.logo =
      await FileRepository.cleanupForRelationships(
        output.logo,
        options,
      );

    if (metaOnly) {
      return output;
    }

    output.createdBy =
      await UserRepository.cleanupForRelationships(
        output.createdBy,
        options,
      );

    return output;
  }
}

export default ProductRepository;
