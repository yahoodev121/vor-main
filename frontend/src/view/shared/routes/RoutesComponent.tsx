import { Route, Switch } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import CustomLoadable from 'src/view/shared/CustomLoadable';
import EmailUnverifiedRoute from 'src/view/shared/routes/EmailUnverifiedRoute';
import EmptyPermissionsRoute from 'src/view/shared/routes/EmptyPermissionsRoute';
import EmptyTenantRoute from 'src/view/shared/routes/EmptyTenantRoute';
import ImpersonateNotification from 'src/view/impersonateNotification';
import muiSelectors from 'src/modules/mui/muiSelectors';
import PrivateRoute from 'src/view/shared/routes/PrivateRoute';
import ProgressBar from 'src/view/shared/ProgressBar';
import PublicRoute from 'src/view/shared/routes/PublicRoute';
import routes from 'src/view/routes';

function RoutesComponent(props) {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(
    authSelectors.selectLoadingInit,
  );
  const muiSettingsLoading = useSelector(
    muiSelectors.selectLoading,
  );
  const loading = authLoading || muiSettingsLoading;
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      ProgressBar.start();
      return;
    }

    if (!loading) {
      ProgressBar.done();
    }
  }, [loading]);

  if (loading) {
    return <div />;
  }

  return (
    <>
      <Switch>
        {routes.publicRoutes.map((route) => (
          <PublicRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emailUnverifiedRoutes.map((route) => (
          <EmailUnverifiedRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emptyTenantRoutes.map((route) => (
          <EmptyTenantRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emptyPermissionsRoutes.map((route) => (
          <EmptyPermissionsRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.privateRoutes
          .filter((route) => !route.virtual)
          .map((route) => (
            <PrivateRoute
              key={route.path}
              currentUser={currentUser}
              currentTenant={currentTenant}
              permissionRequired={route.permissionRequired}
              path={route.path}
              component={CustomLoadable({
                loader: route.loader,
              })}
              exact={Boolean(route.exact)}
            />
          ))}

        {routes.simpleRoutes.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}
      </Switch>
      <ImpersonateNotification />
    </>
  );
}

export default RoutesComponent;
