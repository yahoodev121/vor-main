import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Errors from 'src/modules/shared/error/errors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';
import UserGroupService from 'src/modules/userGroup/userGroupService';
import NewUserGroupForm from 'src/view/userGroup/form/NewUserGroupForm';

function UserGroupFormModal(props) {
  const { onClose, onSuccess } = props;

  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await UserGroupService.create(data);
      const record = await UserGroupService.find(id);
      setSaveLoading(false);
      onSuccess(record);
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
              {i18n('entities.userGroup.new.title')}
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
          <NewUserGroupForm
            saveLoading={saveLoading}
            onSubmit={doSubmit}
            onCancel={doClose}
            modal
          />
        </DialogContent>
      </MDBox>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default UserGroupFormModal;