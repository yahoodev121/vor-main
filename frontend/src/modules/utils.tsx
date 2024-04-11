import { i18n } from 'src/i18n';
import { ISorter } from 'src/modules/types';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import moment from 'moment';
import urlParse from 'url-parse';
import mammoth from 'mammoth/mammoth.browser';

export const getUrlBasedOnTenant = (url) => {
  const tenantId = AuthCurrentTenant.get();
  return `/tenant/${tenantId}/${url}`;
};

export const getOrderBy = (sorter: ISorter) => {
  if (!sorter) {
    return null;
  }

  if (!sorter.field) {
    return null;
  }

  const direction =
    sorter.order === 'desc' ? 'DESC' : 'ASC';

  return `${sorter.field}_${direction}`;
};

export const getUserNameOrEmailPrefix = (user) => {
  if (!user || !(user instanceof Object)) {
    return null;
  }
  const fullName = [user.firstName, user.lastName]
    .join(' ')
    .trim();

  return fullName === ''
    ? user.email?.split('@')[0]
    : fullName;
};

export const getClientOrVendorName = (user) => {
  const tenantId = AuthCurrentTenant.get();
  const tenant = user?.tenants?.find(
    ({ tenant }) => tenant.id === tenantId,
  );
  if (!tenant) {
    return null;
  }
  return tenant.clients[0]?.name ?? tenant.vendors[0]?.name;
};

export const getUserAvatar = (user) => {
  if (!user || !user.avatars || !user.avatars.length) {
    return null;
  }

  return user.avatars[0].downloadUrl;
};

export const getAbsoluteDateTimeByHour = (value) => {
  if (!value) {
    return null;
  }

  const oneHourUnix = 3600;
  const originUnix = moment(value).unix();
  const restUnix = originUnix % oneHourUnix;
  const newUnix =
    originUnix -
    restUnix +
    (restUnix > 0 ? oneHourUnix : 0);

  return moment.unix(newUnix);
};

export const getRowsByColumns = (rows, columns = 1) => {
  const newRows: any[] = [];
  if (!rows) {
    return newRows;
  }
  rows.forEach((row, index) => {
    const columnIndex = index % columns;
    if (!newRows[columnIndex]) {
      newRows[columnIndex] = [];
    }
    newRows[columnIndex].push(row);
  });
  return newRows;
};

export const booleanOptions = [
  {
    value: 'true',
    label: i18n('common.yes'),
  },
  {
    value: 'false',
    label: i18n('common.no'),
  },
];

export const extractsDomain = (url) => {
  const obj = urlParse(url);
  return obj.hostname.replace(/^www\./g, '');
};

export const extractsHostUrl = (url) => {
  const obj = urlParse(url);
  return [obj.protocol, obj.host].join('');
};

export const renameAllKeysWithPrefix = (
  obj,
  prefix,
  availableKeys = null,
) => {
  if (!obj) {
    return obj;
  }
  if (!prefix) {
    return obj;
  }
  const newObj = {};
  for (const key of Object.keys(obj)) {
    if (availableKeys && !availableKeys.includes(key)) {
      continue;
    }
    newObj[`${prefix}${key}`] = obj[key];
  }
  return newObj;
};

export const renameAllKeysWithoutPrefix = (
  obj,
  prefix,
  availableKeys = null,
) => {
  if (!obj) {
    return obj;
  }
  if (!prefix) {
    return obj;
  }
  const newObj = {};
  const prefixRegExp = new RegExp(`^${prefix}`);
  for (const key of Object.keys(obj)) {
    const newKey = key.replace(prefixRegExp, '');
    if (availableKeys && !availableKeys.includes(newKey)) {
      continue;
    }
    newObj[newKey] = obj[key];
  }
  return newObj;
};

export const toSafeLimitedValue = (v, limit = 0) =>
  !limit ? v : v >= limit ? limit : v;

export const toArray = (v) =>
  !v ? v : Array.isArray(v) ? v : [v];

export const toSafeArray = (v) =>
  !v ? [] : Array.isArray(v) ? v : [v];

export const toUniqueArray = (v) =>
  !v ? v : Array.from(new Set(toArray(v)));

export const toSafeUniqueArray = (v) =>
  !v ? [] : Array.from(new Set(toArray(v)));

export const parseDateOnly = (date) => {
  const unixTimestamp = moment(date).unix();
  return moment.unix(
    unixTimestamp - (unixTimestamp % 86400),
  );
};

export const indexToBullet = (index, uppercase = true) =>
  String.fromCharCode(
    ((index ?? 0) % 26) +
      (uppercase ? 'A' : 'a').charCodeAt(0),
  ).repeat((((index ?? 0) / 26) | 0) + 1);



export async function convertWordDocumentToString(filesArr: File[]): Promise<string> {
  if (!filesArr || filesArr.length === 0) {
    return Promise.reject("No files provided.");
  }

  return new Promise<string>(async (resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const arrayBuffer = reader.result as ArrayBuffer;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Combine all files into a single Blob
    const blobArray = filesArr.reduce((acc, file) => {
      acc.push(file);
      return acc;
    }, []);

    const combinedBlob = new Blob(blobArray);

    reader.readAsArrayBuffer(combinedBlob);
  });
}

// const wordFile: File = ... // Your Word document file
// convertWordToText(wordFile)
//   .then((text) => {
//     console.log('Converted text:', text);
//   })
//   .catch((error) => {
//     console.error('Error converting Word to text:', error);
//   });
