import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditEmailTemplateLayout from 'src/view/emailTemplate/form/EditEmailTemplateLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewEmailTemplateLayout from 'src/view/emailTemplate/form/NewEmailTemplateLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.emailTemplate.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  fromEmailAddress: yupFormSchemas.email(
    i18n('entities.emailTemplate.fields.fromEmailAddress'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  subject: yupFormSchemas.string(
    i18n('entities.emailTemplate.fields.subject'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  body: yupFormSchemas.string(
    i18n('entities.emailTemplate.fields.body'),
    {
      required: true,
      min: 1,
      // max: 5000,
    },
  ),
});

function EmailTemplateForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      fromEmailAddress: record.fromEmailAddress,
      subject: record.subject,
      body: record.body,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const {
    saveLoading,
    modal,
    isEditing,
    title,
    hiddenImpossibleFields,
  } = props;

  const makeFormButtons = (modal = false) => {
    return (
      <FormButtons
        style={{
          flexDirection: 'row-reverse',
          margin: modal ? 0 : undefined,
        }}
      >
        <MDButton
          variant="gradient"
          color={sidenavColor}
          disabled={saveLoading}
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          startIcon={<SaveIcon />}
          size="small"
        >
          {i18n('common.save')}
        </MDButton>

        <MDButton
          variant="outlined"
          color={sidenavColor}
          disabled={saveLoading}
          onClick={onReset}
          type="button"
          startIcon={<UndoIcon />}
          size="small"
        >
          {i18n('common.reset')}
        </MDButton>

        {props.onCancel ? (
          <MDButton
            variant="outlined"
            color={sidenavColor}
            disabled={saveLoading}
            onClick={() => props.onCancel()}
            type="button"
            startIcon={<CloseIcon />}
            size="small"
          >
            {i18n('common.cancel')}
          </MDButton>
        ) : null}
      </FormButtons>
    );
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isEditing &&
            (modal ? (
              <NewEmailTemplateLayout
                title={title}
                initialValues={{ ...initialValues }}
                hiddenImpossibleFields={
                  hiddenImpossibleFields
                }
                record={props.record}
                modal
              />
            ) : (
              <Grid
                container
                spacing={1.6}
                justifyContent="center"
                mt={0.8}
              >
                <Grid item lg={9} md={8} sm={12} xs={12}>
                  <Card>
                    <MDBox px={1.6} py={1.6}>
                      <NewEmailTemplateLayout
                        title={title}
                        initialValues={{ ...initialValues }}
                        hiddenImpossibleFields={
                          hiddenImpossibleFields
                        }
                        modal
                      />
                      <MDBox p={0.8}>
                        {makeFormButtons(true)}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            ))}
          {isEditing && !modal && (
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <MDTypography variant="h4">
                {i18n('entities.emailTemplate.edit.title')}
              </MDTypography>
              {makeFormButtons(false)}
            </MDBox>
          )}
          {isEditing && modal && (
            <GradientTitle>
              {i18n('entities.emailTemplate.edit.title')}
            </GradientTitle>
          )}
          {isEditing && (
            <EditEmailTemplateLayout
              title={title}
              initialValues={{ ...initialValues }}
              hiddenImpossibleFields={
                hiddenImpossibleFields
              }
              record={props.record}
              modal
            />
          )}
          {modal && (
            <MDBox mt={1.6}>{makeFormButtons(modal)}</MDBox>
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default EmailTemplateForm;
