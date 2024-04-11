import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProgramRequirementLayout from 'src/view/programRequirement/form/EditProgramRequirementLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewProgramRequirementLayout from 'src/view/programRequirement/form/NewProgramRequirementLayout';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ProgramControlViewTable from 'src/view/programControl/view/ProgramControlViewTable';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';
import Message from 'src/view/shared/message';

const schema = yup.object().shape({
  programs: yupFormSchemas.relationToMany(
    i18n('entities.programRequirement.fields.programs'),
    {},
  ),
  controls: yupFormSchemas.relationToMany(
    i18n('entities.programRequirement.fields.controls'),
    {},
  ),
  name: yupFormSchemas.string(
    i18n('entities.programRequirement.fields.name'),
    {
      required: true,
      max: 300,
      min: 1,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.programRequirement.fields.description'),
    {
      max: 1000,
    },
  ),
  requirementID: yupFormSchemas.string(
    i18n(
      'entities.programRequirement.fields.requirementID',
    ),
    {
      required: true,
      max: 15,
      min: 1,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.programRequirement.fields.tags'),
    {},
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.programRequirement.fields.notes'),
    {
      max: 50,
    },
  ),
});

function ProgramRequirementForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      programs: record.programs || props.programs || [],
      controls: record.controls || [],
      name: record.name,
      description: record.description,
      requirementID: record.requirementID,
      tags: record.tags || [],
      notes: record.notes || [],
    };
  });

  const [visibleRiskModal, setVisibleRiskModal] =
    useState(null);

  const handleOpenCreateRisk = (args) => {
    setVisibleRiskModal(args);
  };

  const handleCloseCreateRisk = () => {
    setVisibleRiskModal(null);
  };

  const doSuccessOnNewRiskFormModal = () => {
    Message.success(i18n('entities.risk.create.success'));
    handleCloseCreateRisk();
  };

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
                <NewProgramRequirementLayout
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
                      <NewProgramRequirementLayout
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
                    'entities.programRequirement.edit.title',
                  )}
                </MDTypography>
                {makeFormButtons(true)}
              </MDBox>
              <EditProgramRequirementLayout
                initialValues={{ ...initialValues }}
                title={title}
                modal
              />
            </form>
            <Card sx={{ height: '100%', mt: 1.6 }}>
              <ProgramControlViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                value={props.record.controls}
              />
            </Card>
          </>
        )}
        {Boolean(visibleRiskModal) && (
          <RiskFormModal
            onClose={handleCloseCreateRisk}
            onSuccess={doSuccessOnNewRiskFormModal}
            {...visibleRiskModal}
          />
        )}
      </FormProvider>
    </FormWrapper>
  );
}

export default ProgramRequirementForm;
