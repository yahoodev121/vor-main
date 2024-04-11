import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ProgramService from 'src/modules/program/programService';
import ProgramWizard from 'src/view/program/form/ProgramWizard';
import ReactDOM from 'react-dom';

function ProgramFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ProgramService.create(data);
      const record = await ProgramService.find(id);
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
      fullWidth={true}
      maxWidth="lg"
      onClose={doClose}
      open={true}
    >
      <DialogContent>
        <ProgramWizard
          modal={true}
          onCancel={doClose}
          onSubmit={doSubmit}
          saveLoading={saveLoading}
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ProgramFormModal;
