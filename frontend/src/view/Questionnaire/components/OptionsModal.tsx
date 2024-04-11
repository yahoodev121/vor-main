import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { toUniqueArray } from 'src/modules/utils';
import { useEffect, useState } from 'react';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

const OptionsModal = (props) => {
  const {
    cancelText,
    okText,
    onClose,
    onConfirm,
    options,
    title,
  } = props;

  const { sidenavColor } = selectMuiSettings();

  const textOptions = Array.isArray(options)
    ? options.map((opt) => opt.value || opt).join('\n')
    : '';

  const [inputValue, setInputValue] = useState(textOptions);

  useEffect(() => {
    setInputValue(textOptions);
  }, [options]);

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        <MDTypography>{title}</MDTypography>
      </DialogTitle>
      <DialogContent>
        <TextAreaFormItem
          onChange={(newValue) => setInputValue(newValue)}
          value={inputValue}
          rows={10}
          forceValue
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={() => onClose()}
          color={sidenavColor}
          size="small"
        >
          {cancelText}
        </MDButton>
        <MDButton
          variant="gradient"
          onClick={() =>
            onConfirm(
              toUniqueArray(
                inputValue
                  .split(/[ ]*\n[ ]*/)
                  .filter((word) => word),
              )?.map((word) => ({
                value: word.trim(),
                label: word.trim(),
              })),
            )
          }
          color={sidenavColor}
          size="small"
        >
          {okText}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
};

export default OptionsModal;
