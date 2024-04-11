import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import QuestionnaireTemplateForm from 'src/view/questionnaireTemplate/form/QuestionnaireTemplateForm';
import QuestionnaireTemplateService from 'src/modules/questionnaireTemplate/questionnaireTemplateService';
import ReactDOM from 'react-dom';

function QuestionnaireTemplateFormModal(props) {
  const { hiddenImpossibleFields } = props;
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } =
        await QuestionnaireTemplateService.create(data);
      const record =
        await QuestionnaireTemplateService.find(id);
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
        <QuestionnaireTemplateForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          hiddenImpossibleFields={hiddenImpossibleFields}
          modal
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default QuestionnaireTemplateFormModal;
