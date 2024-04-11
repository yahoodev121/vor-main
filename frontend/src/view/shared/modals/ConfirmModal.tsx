import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';

function ConfirmModal(props) {
  const {
    cancelText,
    content,
    okText,
    onClose,
    onConfirm,
    title,
  } = props;
  const { sidenavColor } = selectMuiSettings();
  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <MDBox topBorder>
        <DialogTitle>
          <MDTypography>
            {title ?? i18n('common.areYouSure')}
          </MDTypography>
        </DialogTitle>
        {!!content && (
          <DialogContent>{content}</DialogContent>
        )}
        <DialogActions>
          <MDButton
            variant="outlined"
            onClick={onClose}
            color={sidenavColor}
            size="small"
          >
            {cancelText ?? i18n('common.no')}
          </MDButton>
          <MDButton
            variant="gradient"
            onClick={onConfirm}
            color={sidenavColor}
            size="small"
            autoFocus
          >
            {okText ?? i18n('common.yes')}
          </MDButton>
        </DialogActions>
      </MDBox>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ConfirmModal;
