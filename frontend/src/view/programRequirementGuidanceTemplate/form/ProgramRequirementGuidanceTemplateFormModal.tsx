import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementGuidanceTemplateForm from 'src/view/programRequirementGuidanceTemplate/form/ProgramRequirementGuidanceTemplateForm';
import ProgramRequirementGuidanceTemplateService from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateService';
import ReactDOM from 'react-dom';

function ProgramRequirementGuidanceTemplateFormModal(
  props,
) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } =
        await ProgramRequirementGuidanceTemplateService.create(
          data,
        );
      const record =
        await ProgramRequirementGuidanceTemplateService.find(
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
        <ProgramRequirementGuidanceTemplateForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ProgramRequirementGuidanceTemplateFormModal;
