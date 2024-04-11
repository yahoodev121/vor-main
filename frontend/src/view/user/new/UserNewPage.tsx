import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import actions from 'src/modules/user/form/userFormActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/user/form/userFormSelectors';
import UserNewForm from 'src/view/user/new/UserNewForm';

function UserNewPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  useEffect(() => {
    dispatch(actions.doInit());
  }, [dispatch]);

  const doSubmit = (id, data) => {
    dispatch(actions.doAdd(data));
  };

  return (
    <Card>
      <MDBox px={2.4} py={2.4} topBorder>
        <MDBox
          pb={2.4}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3">
            {i18n('user.new.title')}
          </MDTypography>
        </MDBox>
        <UserNewForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={() => getHistory().push('/user')}
        />
      </MDBox>
    </Card>
  );
}

export default UserNewPage;
