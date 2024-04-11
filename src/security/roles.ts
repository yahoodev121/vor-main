class Roles {
  static get values() {
    return {
      admin: 'admin',
      client: 'client',
      custom: 'custom',
      vendor: 'vendor',
      taskonly: 'taskonly',
    };
  }

  static get userGroupRoles() {
    return [this.values.admin, this.values.custom];
  }

  static get banUserGroupRoles() {
    return [this.values.client, this.values.vendor];
  }

  static hasBanUserGroupsRole(roles) {
    return (
      !!roles &&
      roles.some((role) =>
        this.banUserGroupRoles.includes(role),
      )
    );
  }

  static filterUserGroupsByRoles(userGroups, roles) {
    return this.hasBanUserGroupsRole(roles)
      ? []
      : userGroups;
  }
}

export default Roles;
