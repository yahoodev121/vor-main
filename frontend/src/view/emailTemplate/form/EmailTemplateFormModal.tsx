import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import EmailTemplateForm from 'src/view/emailTemplate/form/EmailTemplateForm';
import EmailTemplateService from 'src/modules/emailTemplate/emailTemplateService';
import Errors from 'src/modules/shared/error/errors';
import ReactDOM from 'react-dom';

function EmailTemplateFormModal(props) {
  const { hiddenImpossibleFields, record } = props;
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await EmailTemplateService.create(
        data,
      );
      const record = await EmailTemplateService.find(id);
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
      <DialogContent>
        <EmailTemplateForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          hiddenImpossibleFields={hiddenImpossibleFields}
          record={record}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default EmailTemplateFormModal;
