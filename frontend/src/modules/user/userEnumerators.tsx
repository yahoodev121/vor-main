import Roles from 'src/security/roles';
import colors from 'src/mui/assets/theme/base/colors';

const userEnumerators = {
  status: [
    'active',
    'inactive',
    'invited',
    'empty-permissions',
  ],
  statusColor: [
    colors.success.main,
    colors.error.main,
    colors.info.main,
    colors.warning.main,
  ],
  roles: Object.keys(Roles.values),
  switchRoles: [
    [Roles.values.custom],
    [Roles.values.client],
  ],
  banRoles4Group: [
    Roles.values.client,
    Roles.values.vendor,
  ],
};

export const hasBanRoles4Group = (roles) =>
  roles &&
  roles.some((role) =>
    userEnumerators.banRoles4Group.includes(role),
  );

export default userEnumerators;
