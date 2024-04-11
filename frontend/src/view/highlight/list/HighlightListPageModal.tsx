import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CloseIcon from '@mui/icons-material/Close';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import HighlightListPage from 'src/view/highlight/list/HighlightListPage';

function HighlightListPageModal(props) {
  const { type, typeId, onClose } = props;
  const { sidenavColor } = selectMuiSettings();

  const doClose = () => {
    return onClose && onClose();
  };

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="xl"
      fullWidth={true}
      fullScreen
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography>
            {i18n('entities.highlight.label')}
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
      <DialogContent sx={{ py: 0 }}>
        <HighlightListPage
          typeId={typeId}
          additionalFilters={{
            client: type === 'client' ? typeId : null,
            vendor: type === 'vendor' ? typeId : null,
          }}
        />
      </DialogContent>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={doClose}
          color={sidenavColor}
          size="small"
        >
          {i18n('common.cancel')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

HighlightListPageModal.propTypes = {
  type: PropTypes.string,
  typeId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HighlightListPageModal;
