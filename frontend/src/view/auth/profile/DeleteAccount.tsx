import { i18n } from 'src/i18n';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Card from '@mui/material/Card';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import userFormActions from 'src/modules/user/form/userFormActions';

const DeleteAccount = (props): JSX.Element => {
  const { destroyLoading, id, saveLoading, user } = props;

  const dispatch = useDispatch();

  const [confirmAction, setConfirmAction] = useState(false);

  const doDeleteAccount = () => {
    dispatch(userFormActions.doDestroy(user.id));
    setConfirmAction(false);
  };

  return (
    <>
      <Card id={id}>
        <MDBox p={2.4} topBorder>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <MDBox lineHeight={1}>
              <MDBox mb={0.8}>
                <MDTypography variant="h5">
                  {i18n('profile.titles.deleteAccount')}
                </MDTypography>
              </MDBox>
              <MDTypography variant="button" color="text">
                {i18n('profile.hints.deleteAccount')}
              </MDTypography>
            </MDBox>
            <MDBox mt={{ xs: 1.6, sm: 0 }} ml="auto">
              <MDButton
                variant="gradient"
                color="error"
                sx={{ height: '100%' }}
                onClick={() => setConfirmAction(true)}
                disabled={
                  confirmAction ||
                  destroyLoading ||
                  saveLoading
                }
                startIcon={<DeleteIcon />}
              >
                {i18n('profile.titles.deleteAccount')}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {confirmAction && (
        <ConfirmModal
          onConfirm={() => doDeleteAccount()}
          onClose={() => setConfirmAction(false)}
        />
      )}
    </>
  );
};

export default DeleteAccount;
