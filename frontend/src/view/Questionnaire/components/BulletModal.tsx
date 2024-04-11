import {
  BulletTypes,
  getBulletText,
} from 'src/view/Questionnaire/common';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import ReactDOM from 'react-dom';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  type: yupFormSchemas.enumerator(
    i18n('entities.questionnaire.labels.bullet.type'),
    {
      required: true,
      options: Object.keys(BulletTypes),
    },
  ),
  prefixInherit: yupFormSchemas.boolean(
    i18n(
      'entities.questionnaire.labels.bullet.prefixInherit',
    ),
  ),
  prefixText: yupFormSchemas.string(
    i18n('entities.questionnaire.labels.bullet.prefixText'),
  ),
  custom: yupFormSchemas.string(
    i18n('entities.questionnaire.labels.bullet.custom'),
  ),
});

const BulletModal = (props) => {
  const {
    bullet,
    color,
    index,
    onConfirm,
    onClose,
    prefix,
    text,
  } = props;

  const [initialValues] = useState(() => {
    return {
      type: bullet.type ?? BulletTypes.numeric,
      prefixInherit: bullet.prefixInherit ?? true,
      prefixText: bullet.prefixText ?? '',
      custom: bullet.custom ?? '',
    };
  });

  const [previewBullet, setPreviewBullet] =
    useState(initialValues);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onChange = () => setPreviewBullet(form.getValues());

  const onSubmit = (values) => {
    onConfirm && onConfirm(values);
  };

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        <MDTypography>
          {i18n(
            'entities.questionnaire.hints.formatBullet',
          )}
        </MDTypography>
      </DialogTitle>
      <DialogContent>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={1.6}>
                <Grid item xs={6}>
                  <Grid container spacing={1.6} px={2.4}>
                    <Grid item xs={12}>
                      <SelectFormItem
                        name="type"
                        label={i18n(
                          'entities.questionnaire.labels.bullet.type',
                        )}
                        options={Object.keys(
                          BulletTypes,
                        ).map((key) => ({
                          value: BulletTypes[key],
                          label: i18n(
                            `entities.questionnaire.enumerators.bullet.types.${key}`,
                          ),
                        }))}
                        variant="standard"
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckboxFormItem
                        name="prefixInherit"
                        label={i18n(
                          'entities.questionnaire.labels.bullet.prefixInherit',
                        )}
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="prefixText"
                        label={i18n(
                          'entities.questionnaire.labels.bullet.prefixText',
                        )}
                        variant="standard"
                        onChange={onChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="custom"
                        label={i18n(
                          'entities.questionnaire.labels.bullet.custom',
                        )}
                        variant="standard"
                        onChange={onChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <MDTypography
                    variant="body1"
                    fontWeight="bold"
                  >
                    {i18n('common.preview')}
                  </MDTypography>
                  <MDTypography
                    variant="body2"
                    fontWeight="bold"
                    color="text"
                  >
                    {getBulletText(
                      previewBullet,
                      index ?? 0,
                      prefix,
                    )}
                    {text}
                  </MDTypography>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </FormWrapper>
      </DialogContent>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={() => onClose()}
          color={color}
          size="small"
        >
          {i18n('common.cancel')}
        </MDButton>
        <MDButton
          variant="gradient"
          onClick={form.handleSubmit(onSubmit)}
          color={color}
          size="small"
        >
          {i18n('common.save')}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
};

export default BulletModal;
