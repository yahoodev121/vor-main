import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ProgramControlForm from 'src/view/programControl/form/ProgramControlForm';
import ProgramControlService from 'src/modules/programControl/programControlService';
import ReactDOM from 'react-dom';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';

function ProgramControlFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ProgramControlService.create(
        data,
      );
      Message.success(
        i18n('entities.programControl.create.success'),
      );
      const record = await ProgramControlService.find(id);
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
        <ProgramControlForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          requirements={props.requirements}
          programId={props.programId}
          onCancel={doClose}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ProgramControlFormModal;
