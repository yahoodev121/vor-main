import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProjectLayout from 'src/view/project/form/EditProjectLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NewProjectLayout from 'src/view/project/form/NewProjectLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.project.fields.name'),
    {
      required: true,
      min: 1,
      max: 200,
    },
  ),
  owner: yupFormSchemas.relationToOne(
    i18n('entities.project.fields.owner'),
    {
      required: true,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.project.fields.description'),
    {
      max: 1000,
    },
  ),
  status: yupFormSchemas.relationToOne(
    i18n('entities.project.fields.status'),
    {
      required: true,
    },
  ),
  type: yupFormSchemas.relationToOne(
    i18n('entities.project.fields.type'),
    {
      required: true,
    },
  ),
  priority: yupFormSchemas.relationToOne(
    i18n('entities.project.fields.priority'),
    {
      required: true,
    },
  ),
  dueDate: yupFormSchemas.datetime(
    i18n('entities.project.fields.dueDate'),
    {
      required: true,
    },
  ),
  completedDate: yupFormSchemas.datetime(
    i18n('entities.project.fields.completedDate'),
    {},
  ),
  teamMembers: yupFormSchemas.relationToMany(
    i18n('entities.project.fields.teamMembers'),
    {},
  ),
  teamGroups: yupFormSchemas.relationToMany(
    i18n('entities.project.fields.teamGroups'),
    {
      max: 5,
    },
  ),
  tasks: yupFormSchemas.relationToMany(
    i18n('entities.project.fields.tasks'),
    {},
  ),
  risks: yupFormSchemas.relationToMany(
    i18n('entities.project.fields.risks'),
    {},
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.project.fields.notes'),
    {
      max: 1000,
    },
  ),
  attachments: yupFormSchemas.files(
    i18n('entities.project.fields.attachments'),
    {},
  ),
});

function ProjectForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      name: record.name,
      owner: record.owner,
      description: record.description,
      status: record.status,
      type: record.type,
      priority: record.priority,
      dueDate: record.dueDate
        ? moment(record.dueDate)
        : null,
      completedDate: record.completedDate
        ? moment(record.completedDate)
        : null,
      teamMembers: record.teamMembers || [],
      teamGroups: record.teamGroups || [],
      tasks: record.tasks || [],
      risks: record.risks || [],
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
          flexDirection: 'row-reverse',
          margin: modal ? 0 : undefined,
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!isEditing &&
            (modal ? (
              <NewProjectLayout
                title={title}
                initialValues={{ ...initialValues }}
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
                      <NewProjectLayout
                        title={title}
                        initialValues={{ ...initialValues }}
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
                {i18n('entities.project.edit.title')}
              </MDTypography>
              {makeFormButtons(false)}
            </MDBox>
          )}
          {isEditing && modal && (
            <GradientTitle>
              {i18n('entities.product.edit.title')}
            </GradientTitle>
          )}
          {isEditing && (
            <EditProjectLayout
              title={title}
              initialValues={{ ...initialValues }}
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

export default ProjectForm;
