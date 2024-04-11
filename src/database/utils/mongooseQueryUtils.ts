import moment from 'moment';
import mongoose from 'mongoose';
/**
 * Utilities to use on Mongoose queries.
 */
export default class MongooseQueryUtils {
  static ObjectId(value) {
    return mongoose.Types.ObjectId.createFromHexString(
      value,
    );
  }
  static isValidObjectId(value) {
    return value && mongoose.Types.ObjectId.isValid(value);
  }
  /**
   * If you pass an invalid uuid to a query, it throws an exception.
   * To hack this behaviour, if the uuid is invalid, it creates a new one,
   * that won't match any of the database.
   * If the uuid is invalid, brings no results.
   */
  static uuid(value) {
    let id = value;

    // If ID is invalid, mongodb throws an error.
    // For that not to happen, if the ObjectID is invalid, it sets
    // some random ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      id = mongoose.Types.ObjectId.createFromTime(
        moment().unix(),
      );
    }

    return id;
  }

  /**
   * Some string values may break the RegExp used for queries.
   * This method escapes it.
   */
  static escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Returns the sort clause.
   */
  static sort(orderBy) {
    if (!orderBy) {
      return undefined;
    }

    let [column, order] = orderBy.split('_');

    if (column === 'id') {
      column = '_id';
    }

    return {
      [column]: order === 'ASC' ? 1 : -1,
    };
  }

  /**
   * Push the $all criteria.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   */
  static pushAllCriteria(
    criteria: any[],
    filter,
    fields: string[],
  ) {
    fields.forEach((field) => {
      if (filter[field]) {
        criteria.push({
          [field]: {
            $all: filter[field],
          },
        });
      }
    });
  }

  /**
   * Push the equal(=) criteria for Boolean.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   */
  static pushBooleanCriteria(
    criteria: any[],
    filter,
    fields: string[],
  ) {
    fields.forEach((field) => {
      if (
        filter[field] === true ||
        filter[field] === 'true' ||
        filter[field] === false ||
        filter[field] === 'false'
      ) {
        criteria.push({
          [field]:
            filter[field] === true ||
            filter[field] === 'true',
        });
      }
    });
  }

  /**
   * Push the equal(=) criteria.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   */
  static pushEqualCriteria(
    criteria: any[],
    filter,
    fields: string[],
  ) {
    fields.forEach((field) => {
      if (filter[field]) {
        criteria.push({
          [field]: filter[field],
        });
      }
    });
  }

  /**
   * Push the equal(=) criteria for UUID.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   */
  static pushEqualUUIDCriteria(
    criteria: any[],
    filter,
    fields: string[] | object,
  ) {
    (Array.isArray(fields)
      ? fields
      : Object.keys(fields)
    ).forEach((field) => {
      if (Array.isArray(fields) && filter[field]) {
        criteria.push({
          [field]: MongooseQueryUtils.uuid(filter[field]),
        });
      } else if (filter[fields[field]]) {
        criteria.push({
          [field]: MongooseQueryUtils.uuid(
            filter[fields[field]],
          ),
        });
      }
    });
  }

  /**
   * Push the $in criteria.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   * @param ignoreEmpty Determine to make the criteria when the filter value is empty.
   * @param notCondition Determine to use which operator one of $in or $nin
   */
  static pushInCriteria(
    criteria: any[],
    filter,
    fields: string[] | object,
    ignoreEmpty = false,
    notCondition = false,
  ) {
    (Array.isArray(fields)
      ? fields
      : Object.keys(fields)
    ).forEach((field) => {
      if (
        Array.isArray(fields) &&
        (ignoreEmpty ||
          (filter[field] && filter[field].length))
      ) {
        criteria.push({
          [field]: notCondition
            ? { $nin: filter[field] ?? [] }
            : { $in: filter[field] ?? [] },
        });
      } else if (
        ignoreEmpty ||
        (filter[fields[field]] &&
          filter[fields[field]].length)
      ) {
        criteria.push({
          [field]: notCondition
            ? { $nin: filter[fields[field]] ?? [] }
            : { $in: filter[fields[field]] ?? [] },
        });
      }
    });
  }

  /**
   * Push the $regex criteria.
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   * @param options The options for $regex criteria.
   */
  static pushRegexCriteria(
    criteria: any[],
    filter,
    fields: string[],
    options: string = 'i',
  ) {
    fields.forEach((field) => {
      if (filter[field]) {
        criteria.push({
          [field]:
            typeof filter[field] === 'string'
              ? {
                  $regex: MongooseQueryUtils.escapeRegExp(
                    filter[field],
                  ),
                  $options: options,
                }
              : {
                  $regex: filter[field],
                },
        });
      }
    });
  }

  /**
   * Push the range criteria
   * @param criteria The criteria array.
   * @param filter JSON object for the criteria.
   * @param fields The string array for the criteria fields.
   */
  static pushRangeCriteria(
    criteria: any[],
    filter,
    fields: string[],
  ) {
    fields.forEach((field) => {
      if (filter[`${field}Range`]) {
        const [start, end] = filter[`${field}Range`];

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteria.push({
            [field]: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteria.push({
            [field]: {
              $lte: end,
            },
          });
        }
      }
    });
  }
}
