import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import highlightQuickActions from 'src/modules/highlight/quick/highlightQuickActions';
import highlightQuickSelectors from 'src/modules/highlight/quick/highlightQuickSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PdfViewer from 'src/view/shared/PdfViewer';
import PropTypes from 'prop-types';
import QuickHighlightForm from 'src/view/highlight/quick/QuickHighlightForm';
import ReactDOM from 'react-dom';

function QuickHighlightModal(props) {
  const { fileId, url, onClose, title } = props;

  const { darkMode, sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const pdfViewerRef = useRef(null);
  const quickHighlightFormRef = useRef(null);

  const highlights =
    useSelector(highlightQuickSelectors.selectHighlights) ??
    [];

  const doClose = () => {
    return onClose && onClose();
  };

  const doSave = () => {
    return quickHighlightFormRef.current?.doSave();
  };

  const doTextSelectionChange = (text, annotations) => {
    dispatch(
      highlightQuickActions.doNewQuickHighlight(
        text,
        annotations,
      ),
    );
  };

  const onClickHighlight = (annotations) => {
    pdfViewerRef?.current?.selectAnnotation(annotations);
  };

  const [readyPdfViewer, setReadyPdfViewer] =
    useState(false);

  const onInitializedPdfViewer = () => {
    setReadyPdfViewer(true);
  };

  useEffect(() => {
    pdfViewerRef?.current?.addAnnotations(
      highlights.reduce(
        (total, highlight) => [
          ...total,
          ...highlight.annotations,
        ],
        [],
      ),
    );
  }, [readyPdfViewer, highlights]);

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
          <MDTypography>{title}</MDTypography>
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
        <Grid spacing={0.8} height="100%" container>
          <Grid xs={9} height="100%" item>
            <PdfViewer
              darkMode={darkMode}
              url={url}
              onInitialized={onInitializedPdfViewer}
              onTextSelectionChange={doTextSelectionChange}
              ref={pdfViewerRef}
            />
          </Grid>
          <Grid xs={3} height="100%" item>
            <QuickHighlightForm
              fileId={fileId}
              onClickHighlight={onClickHighlight}
              ref={quickHighlightFormRef}
            />
          </Grid>
        </Grid>
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
        <MDButton
          variant="gradient"
          onClick={doSave}
          color={sidenavColor}
          size="small"
          autoFocus
        >
          {i18n('common.save')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

QuickHighlightModal.propTypes = {
  fileId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default QuickHighlightModal;
