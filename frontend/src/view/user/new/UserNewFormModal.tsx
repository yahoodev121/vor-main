import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Errors from 'src/modules/shared/error/errors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';
import UserNewForm from 'src/view/user/new/UserNewForm';
import UserService from 'src/modules/user/userService';

const UserNewFormModal = (props) => {
  const { onClose, onSuccess, readOnlyRoles, roles } =
    props;
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      await UserService.create(data);

      const { rows } = await UserService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );
      setSaveLoading(false);

      onSuccess(rows[0]);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => onClose();

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="md"
      fullWidth={true}
    >
      <MDBox topBorder>
        <DialogTitle>
          <MDBox
            display="flex"
            justifyContent="space-between"
          >
            <MDTypography>
              {i18n('user.new.titleModal')}
            </MDTypography>
            <IconButton
              color="secondary"
              onClick={doClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </MDBox>
        </DialogTitle>
        <DialogContent>
          <UserNewForm
            modal={true}
            onCancel={doClose}
            onSubmit={doSubmit}
            readOnlyRoles={readOnlyRoles}
            roles={roles}
            saveLoading={saveLoading}
            single={true}
          />
        </DialogContent>
      </MDBox>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
};

export default UserNewFormModal;
