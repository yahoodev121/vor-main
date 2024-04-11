import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

function PromptModal(props) {
  const {
    cancelText,
    label,
    max,
    min,
    okText,
    onClose,
    onConfirm,
    title,
  } = props;
  const { sidenavColor } = selectMuiSettings();
  const [value, setValue] = useState('');
  const form = useForm({
    resolver: yupResolver(
      yup.object().shape({
        input: yupFormSchemas.string(label ?? title, {
          required: true,
          min: min ?? 1,
          max: max ?? 100,
        }),
      }),
    ),
    mode: 'onSubmit',
    defaultValues: {
      input: '',
    },
  });
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
        <FormWrapper>
          <FormProvider {...form}>
            <form
              onSubmit={() => onConfirm(value)}
              autoComplete="off"
              noValidate
            >
              <InputFormItem
                name="input"
                onChange={setValue}
                value={value}
                autoFocus
                forceValue
              />
            </form>
          </FormProvider>
        </FormWrapper>
      </DialogContent>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={onClose}
          color={sidenavColor}
          size="small"
        >
          {cancelText}
        </MDButton>
        <MDButton
          variant="gradient"
          onClick={() => onConfirm(value)}
          color={sidenavColor}
          size="small"
        >
          {okText}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default PromptModal;
