import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import ClientCategoryForm from 'src/view/clientCategory/form/ClientCategoryForm';
import ClientCategoryService from 'src/modules/clientCategory/clientCategoryService';
import CloseIcon from '@mui/icons-material/Close';
import Errors from 'src/modules/shared/error/errors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';

function ClientCategoryFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ClientCategoryService.create(
        data,
      );
      const record = await ClientCategoryService.find(id);
      setSaveLoading(false);
      props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => {
    return props.onClose();
  };

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
              {i18n('entities.clientCategory.new.title')}
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
          <ClientCategoryForm
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

export default ClientCategoryFormModal;
