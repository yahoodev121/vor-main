import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import UserFilter from 'src/view/user/list/UserFilter';
import userListActions from 'src/modules/user/list/userListActions';
import userListSelectors from 'src/modules/user/list/userListSelectors';
import UserTable from 'src/view/user/list/UserTable';

function UserSubTable(props) {
  const { groupId, doUseCard, toggleUsersForGroup } = props;
  const [dispatched, setDispatched] = useState(false);
  const { sidenavColor } = selectMuiSettings();
  const showAllUsers = useSelector(
    userListSelectors.selectShowAllUsers,
  );
  const loading = useSelector(
    userListSelectors.selectLoading,
  );
  const dispatch = useDispatch();
  const toggleShowAllUsers = () => {
    dispatch(userListActions.doShowAllUsers(!showAllUsers));
  };

  useEffect(() => {
    dispatch(userListActions.doReset(true));
    setDispatched(true);
  }, []);

  const render = () => (
    <>
      <MDBox pt={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          gap={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h5">
            {i18n('user.title')}
          </MDTypography>
          <MDBox flexGrow={1}>
            {dispatched && (
              <UserFilter
                groupId={groupId}
                extras={{ limitRoles: true }}
              />
            )}
          </MDBox>
          {groupId && (
            <MDButton
              size="small"
              variant="gradient"
              color={sidenavColor}
              type="submit"
              disabled={loading}
              onClick={toggleShowAllUsers}
            >
              {i18n(
                showAllUsers
                  ? 'common.showOnlyGroupUsers'
                  : 'common.showAllUsers',
              )}
            </MDButton>
          )}
        </MDBox>
      </MDBox>
      {dispatched && (
        <UserTable
          groupId={groupId}
          toggleUsersForGroup={toggleUsersForGroup}
        />
      )}
    </>
  );

  return doUseCard ? <Card>{render()}</Card> : render();
}

UserSubTable.defaultProps = {
  doUseCard: true,
  toggleUsersForGroup: false,
};

UserSubTable.propTypes = {
  groupId: PropTypes.string,
  doUseCard: PropTypes.bool,
  toggleUsersForGroup: PropTypes.bool,
};

export default UserSubTable;
