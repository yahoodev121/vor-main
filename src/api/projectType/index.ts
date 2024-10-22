export default (app) => {
  app.post(
    `/tenant/:tenantId/project-type`,
    require('./projectTypeCreate').default,
  );
  app.put(
    `/tenant/:tenantId/project-type/:id`,
    require('./projectTypeUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/project-type/import`,
    require('./projectTypeImport').default,
  );
  app.delete(
    `/tenant/:tenantId/project-type`,
    require('./projectTypeDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/project-type/autocomplete`,
    require('./projectTypeAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/project-type`,
    require('./projectTypeList').default,
  );
  app.get(
    `/tenant/:tenantId/project-type/:id`,
    require('./projectTypeFind').default,
  );
};
