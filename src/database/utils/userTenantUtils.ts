import { IRepositoryOptions } from '../repositories/IRepositoryOptions';
import { toArray } from '../../utils/arrayUtils';
import PermissionChecker from '../../services/user/permissionChecker';
import Roles from '../../security/roles';

export function isUserInTenant(user, tenantId) {
  if (!user) {
    return false;
  }

  return user.tenants.some(
    (tenantUser) =>
      String(tenantUser.tenant.id) === String(tenantId),
  );
}

const getPermissionChecker = (
  options: IRepositoryOptions,
) =>
  new PermissionChecker({
    currentTenant: options.currentTenant,
    currentUser: options.currentUser,
    language: options.language,
  });

export const hasRolesOnly = (
  options: IRepositoryOptions,
  roles,
) => {
  const permissionChecker = getPermissionChecker(options);
  const aRoles = toArray(roles);
  let hasAny = false;
  for (const role of aRoles) {
    hasAny = hasAny || permissionChecker.hasRole(role);
  }
  if (!hasAny) {
    return false;
  }
  for (const key of Object.keys(Roles.values)) {
    if (aRoles.includes(Roles.values[key])) {
      continue;
    }
    if (permissionChecker.hasRole(Roles.values[key])) {
      return false;
    }
  }
  return true;
};

export const hasRole = (
  options: IRepositoryOptions,
  role,
) => getPermissionChecker(options).hasRole(role);
