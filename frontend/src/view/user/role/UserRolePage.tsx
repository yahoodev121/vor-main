import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/user/role/userRoleActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Roles from 'src/security/roles';
import RoleSummary from 'src/view/user/role/RoleSummary';
import selectors from 'src/modules/user/role/userRoleSelectors';
import Spinner from 'src/view/shared/Spinner';
import UsersWithRole from 'src/view/user/role/UsersWithRole';

const UserRolePage = (props) => {
  const dispatch = useDispatch();

  const summaryLoading = useSelector(
    selectors.selectSummaryLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const userLoading = useSelector(
    selectors.selectUsersLoading,
  );

  const summary = useSelector(selectors.selectSummary);
  const users = useSelector(selectors.selectUsers);

  const loading =
    summaryLoading || saveLoading || userLoading;

  const defaultRole = Object.keys(Roles.values)[0];

  const [currentRole, setCurrentRole] =
    useState(defaultRole);

  const doSelect = (role) => {
    setCurrentRole(role);
    dispatch(actions.doLoadUsersByRole(role));
  };

  const doAddRole = (users) =>
    dispatch(actions.doAddRole(users, currentRole));

  const doRemoveRole = (users) =>
    dispatch(actions.doRemoveRole(users, currentRole));

  useEffect(() => {
    dispatch(actions.doSummary());
    doSelect(defaultRole);
  }, []);

  return (
    <MDBox py={2.4}>
      <Grid spacing={2.4} container>
        <Grid md={3} xs={12} item>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            px={2.4}
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('role.title')}
            </MDTypography>
          </MDBox>
          <RoleSummary
            doSelect={doSelect}
            summary={summary}
          />
        </Grid>
        <Grid md={9} xs={12} item>
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n(`roles.${currentRole}.label`)}
            </MDTypography>
          </MDBox>
          <UsersWithRole
            doAddRole={doAddRole}
            doRemoveRole={doRemoveRole}
            users={users}
          />
        </Grid>
      </Grid>
      {loading && <Spinner overlap={true} />}
    </MDBox>
  );
};

export default UserRolePage;
