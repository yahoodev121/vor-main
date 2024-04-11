import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import userGroupListActions from 'src/modules/userGroup/list/userGroupListActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import UserGroupListFilter from 'src/view/userGroup/list/UserGroupListFilter';
import UserGroupListTable from 'src/view/userGroup/list/UserGroupListTable';
import UserGroupListToolbar from 'src/view/userGroup/list/UserGroupListToolbar';

function UserGroupListPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGroupListActions.doClearAllSelected());
  }, []);

  return (
    <Card>
      <MDBox pt={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.userGroup.list.title')}
          </MDTypography>

          <UserGroupListToolbar />
        </MDBox>
        <UserGroupListFilter />
      </MDBox>
      <UserGroupListTable />
    </Card>
  );
}

export default UserGroupListPage;
