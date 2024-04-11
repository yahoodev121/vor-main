import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import CampaignForm from 'src/view/campaign/form/CampaignForm';
import CampaignService from 'src/modules/campaign/campaignService';
import Errors from 'src/modules/shared/error/errors';
import ReactDOM from 'react-dom';

function CampaignFormModal(props) {
  const { hiddenImpossibleFields } = props;
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await CampaignService.create(data);
      const record = await CampaignService.find(id);
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
        <CampaignForm
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

export default CampaignFormModal;
