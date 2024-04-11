import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import EditProgramLayout from 'src/view/program/form/EditProgramLayout';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NewProgramLayout from 'src/view/program/form/NewProgramLayout';
import programEnumerators from 'src/modules/program/programEnumerators';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import ProgramRequirementViewTable from 'src/view/programRequirement/view/ProgramRequirementViewTable';
import ProgramControlViewTable from 'src/view/programControl/view/ProgramControlViewTable';
import Message from 'src/view/shared/message';
import RiskFormModal from 'src/view/risk/form/RiskFormModal';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.program.fields.name'),
    {
      required: true,
      max: 100,
      min: 1,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.program.fields.description'),
    {
      max: 250,
    },
  ),
  requirements: yupFormSchemas.relationToMany(
    i18n('entities.program.fields.requirements'),
    {},
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.program.fields.tags'),
    {},
  ),
  notes: yupFormSchemas.relationToMany(
    i18n('entities.program.fields.notes'),
    {
      max: 50,
    },
  ),
});

function ProgramForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      reference: record.reference,
      name: record.name,
      description: record.description,
      requirements: record.requirements || [],
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
                <NewProgramLayout title={title} modal />
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
                      <NewProgramLayout
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
                  {i18n('entities.program.edit.title')}
                </MDTypography>
                {makeFormButtons(true)}
              </MDBox>
              <EditProgramLayout
                initialValues={{ ...initialValues }}
                title={title}
                modal
              />
            </form>
            <Card sx={{ height: '100%', mt: 1.6 }}>
              <ProgramRequirementViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                value={props.record.requirements}
              />
            </Card>
            <Card sx={{ height: '100%', mt: 1.6 }}>
              <ProgramControlViewTable
                handleOpenCreateRisk={handleOpenCreateRisk}
                requirements={props.record.requirements}
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

export default ProgramForm;
