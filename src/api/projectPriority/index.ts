export default (app) => {
  app.post(
    `/tenant/:tenantId/project-priority`,
    require('./projectPriorityCreate').default,
  );
  app.put(
    `/tenant/:tenantId/project-priority/:id`,
    require('./projectPriorityUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/project-priority/import`,
    require('./projectPriorityImport').default,
  );
  app.delete(
    `/tenant/:tenantId/project-priority`,
    require('./projectPriorityDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/project-priority/autocomplete`,
    require('./projectPriorityAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/project-priority`,
    require('./projectPriorityList').default,
  );
  app.get(
    `/tenant/:tenantId/project-priority/:id`,
    require('./projectPriorityFind').default,
  );
};
