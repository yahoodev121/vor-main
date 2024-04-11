import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProgramControlLayout from 'src/view/programControl/form/EditProgramControlLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewProgramControlLayout from 'src/view/programControl/form/NewProgramControlLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import TaskViewItem from 'src/view/task/view/TaskViewItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.programControl.fields.name'),
    {
      required: true,
      min: 1,
      max: 300,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.programControl.fields.description'),
    {
      required: true,
      min: 1,
      max: 1000,
    },
  ),
  tasks: yupFormSchemas.relationToMany(
    i18n('entities.programControl.fields.tasks'),
    {},
  ),
  requirements: yupFormSchemas.relationToManyInRequirements(
    i18n('entities.programControl.fields.requirements'),
    {},
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.programControl.fields.tags'),
    {},
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.programControl.fields.notes'),
    {
      max: 50,
    },
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.task.fields.attachments'),
    {},
  ),
});

function ProgramControlForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};
    const requirements = props.requirements
      ? props.requirements
      : [];

    return {
      name: record.name,
      description: record.description,
      tasks: record.tasks || [],
      requirements: record.requirements || requirements,
      tags: record.tags || [],
      notes: record.notes || [],
      attachments: record.attachments || [],
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
              <div>
                <NewProgramControlLayout
                  title={title}
                  programId={props.programId}
                  modal
                />
                {makeFormButtons(modal)}
              </div>
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
                      <NewProgramControlLayout
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
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h4">
                  {i18n(
                    'entities.programControl.edit.title',
                  )}
                </MDTypography>
                {makeFormButtons(true)}
              </MDBox>
              <EditProgramControlLayout
                initialValues={{ ...initialValues }}
                title={title}
                modal
              />
            </form>
            <Card sx={{ mt: 1.6 }}>
              <TaskViewItem value={props.record.tasks} />
            </Card>
          </div>
        )}
      </FormProvider>
    </FormWrapper>
  );
}

export default ProgramControlForm;
