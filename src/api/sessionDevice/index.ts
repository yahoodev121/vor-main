export default (app) => {
  app.get(
    `/tenant/:tenantId/session-device/:id`,
    require('./sessionDeviceFind').default,
  );
  app.get(
    `/tenant/:tenantId/session-devices/:userId`,
    require('./sessionDeviceList').default,
  );
};
