import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementForm from 'src/view/programRequirement/form/ProgramRequirementForm';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';
import ReactDOM from 'react-dom';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';

function ProgramRequirementFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await ProgramRequirementService.create(
        data,
      );
      Message.success(
        i18n('entities.programRequirement.create.success'),
      );
      const record = await ProgramRequirementService.find(
        id,
      );
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
        <ProgramRequirementForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          programs={props.programs}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ProgramRequirementFormModal;
