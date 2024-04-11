import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import userGroupListActions from 'src/modules/userGroup/list/userGroupListActions';
import userGroupListSelectors from 'src/modules/userGroup/list/userGroupListSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import UserGroupListFilter from 'src/view/userGroup/list/UserGroupListFilter';
import UserGroupListTable from 'src/view/userGroup/list/UserGroupListTable';

const UserGroups = (props): JSX.Element => {
  const [dispatched, setDispatched] = useState(false);
  const { id, user } = props;
  const showAllUserGroups = useSelector(
    userGroupListSelectors.selectShowAllUserGroups,
  );

  const loading = useSelector(
    userGroupListSelectors.selectLoading,
  );

  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();
  const toggleShowAllUsers = () => {
    dispatch(
      userGroupListActions.doShowAllUserGroups(
        !showAllUserGroups,
      ),
    );
  };

  useEffect(() => {
    dispatch(userGroupListActions.doReset(true));
    setDispatched(true);
  }, []);

  return (
    <Card>
      <MDBox id={id} pt={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          gap={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h5">
            {i18n('entities.userGroup.list.title')}
          </MDTypography>
          <MDBox flexGrow={1}>
            {dispatched && (
              <UserGroupListFilter userId={user?.id} />
            )}
          </MDBox>
          <MDButton
            size="small"
            variant="gradient"
            color={sidenavColor}
            type="submit"
            disabled={loading}
            onClick={toggleShowAllUsers}
          >
            {i18n(
              showAllUserGroups
                ? 'common.showOnlyAssignedGroups'
                : 'common.showAllUserGroups',
            )}
          </MDButton>
        </MDBox>
      </MDBox>
      {dispatched && (
        <UserGroupListTable userId={user?.id} />
      )}
    </Card>
  );
};

export default UserGroups;
