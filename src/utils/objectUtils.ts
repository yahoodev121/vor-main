import lodash from 'lodash';

export const safePick = (
  obj,
  fields: string[] | null = null,
) =>
  !obj || !fields || !fields.length
    ? obj
    : lodash.pick(obj, fields);

export const safeBoolean = (value) =>
  (typeof value === 'string' &&
    value.toLowerCase() === 'true') ||
  value === true;
