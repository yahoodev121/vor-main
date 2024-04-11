import appRootPath from 'app-root-path';
import path from 'path';

const patterns = [
  {
    find: /\{APP_ROOT\}/g,
    replace: appRootPath.path,
  },
];

export function getRealPath(url) {
  if (!url) {
    return url;
  }
  let result = url;
  for (const pattern of patterns) {
    result = result.replace(pattern.find, pattern.replace);
  }
  return result
    .replace(/\//g, path.sep)
    .replace(/\\/g, path.sep);
}
