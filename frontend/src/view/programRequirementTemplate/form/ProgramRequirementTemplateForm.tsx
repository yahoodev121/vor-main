import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProgramRequirementTemplateLayout from 'src/view/programRequirementTemplate/form/EditProgramRequirementTemplateLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewProgramRequirementTemplateLayout from 'src/view/programRequirementTemplate/form/NewProgramRequirementTemplateLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ProgramControlTemplateViewTable from 'src/view/programControlTemplate/view/ProgramControlTemplateViewTable';

const schema = yup.object().shape({
  requirementID: yupFormSchemas.string(
    i18n(
      'entities.programRequirementTemplate.fields.requirementID',
    ),
    {
      required: true,
      max: 15,
      min: 1,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.programRequirementTemplate.fields.name'),
    {
      required: true,
      max: 100,
      min: 1,
    },
  ),
  description: yupFormSchemas.string(
    i18n(
      'entities.programRequirementTemplate.fields.description',
    ),
    {
      max: 250,
    },
  ),
  programTemplates: yupFormSchemas.relationToMany(
    i18n(
      'entities.programRequirementTemplate.fields.programTemplates',
    ),
    {},
  ),
  guidanceTemplates: yupFormSchemas.relationToMany(
    i18n(
      'entities.programRequirementTemplate.fields.guidanceTemplates',
    ),
    {},
  ),
  controlTemplates: yupFormSchemas.relationToMany(
    i18n(
      'entities.programRequirementTemplate.fields.controlTemplates',
    ),
    {},
  ),
});

function ProgramRequirementTemplateForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      requirementID: record.requirementID,
      name: record.name,
      description: record.description,
      programTemplates: record.programTemplates || [],
      guidanceTemplates: record.guidanceTemplates || [],
      controlTemplates: record.controlTemplates || [],
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

  const { saveLoading, modal, isEditing, title } = props;

  const makeFormButtons = (modal = false) => {
    return (
      <FormButtons
        style={{
          flexDirection: modal ? 'row-reverse' : undefined,
        }}
      >
        <MDButton
          variant="gradient"
          color={sidenavColor}
          disabled={saveLoading}
          type="submit"
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
        {!isEditing && (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {modal ? (
              <>
                <NewProgramRequirementTemplateLayout
                  title={title}
                  modal
                />
                {makeFormButtons(modal)}
              </>
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
                      <NewProgramRequirementTemplateLayout
                        title={title}
                        modal
                      />
                      <MDBox px={0.8}>
                        {makeFormButtons(true)}
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            )}
          </form>
        )}
        {isEditing && (
          <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h4">
                  {i18n(
                    'entities.programRequirementTemplate.edit.title',
                  )}
                </MDTypography>
                {makeFormButtons(true)}
              </MDBox>
              <EditProgramRequirementTemplateLayout
                initialValues={{ ...initialValues }}
                title={title}
                modal
              />
            </form>
            <Card sx={{ mt: 1.6 }}>
              <ProgramControlTemplateViewTable
                value={props.record.controlTemplates}
              />
            </Card>
          </>
        )}
      </FormProvider>
    </FormWrapper>
  );
}

export default ProgramRequirementTemplateForm;
