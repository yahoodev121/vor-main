import {
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import About from 'src/view/program/form/components/About';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import Complete from 'src/view/program/form/components/Complete';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import programTemplateSummarizingActions from 'src/modules/programTemplate/summarizing/programTemplateSummarizingActions';
import programTemplateSummarizingSelectors from 'src/modules/programTemplate/summarizing/programTemplateSummarizingSelectors';
import programTemplateViewActions from 'src/modules/programTemplate/view/programTemplateViewActions';
import programTemplateViewSelectors from 'src/modules/programTemplate/view/programTemplateViewSelectors';
import SaveIcon from '@mui/icons-material/Save';
import SelectRequirements from 'src/view/program/form/components/SelectRequirements';
import Spinner from 'src/view/shared/Spinner';
import StartProgram from 'src/view/program/form/components/StartProgram';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = (stepContent = null) =>
  yup.object().shape({
    name: yupFormSchemas.string(
      i18n('entities.program.fields.name'),
      {
        required: stepContent === About,
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
    requirements: yupFormSchemas.stringArray(
      i18n('entities.program.fields.requirements'),
      {},
    ),
    controls: yupFormSchemas.generic(
      i18n('entities.program.fields.controls'),
    ),
  });

const ProgramWizard = (props) => {
  const dispatch = useDispatch();

  const {
    initLoading,
    modal,
    onCancel,
    onSubmit: doSubmit,
    record,
    saveLoading,
    title,
  } = props;

  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => ({
    name: record?.name,
    description: record?.description,
    requirements: record?.requirements || [],
    controls: record?.controls || {},
  }));

  const getSteps = (): {
    label: string;
    content: any;
  }[] =>
    [
      {
        label: i18n(
          'entities.program.wizard.sections.about',
        ),
        content: About,
      },
      {
        label: i18n(
          'entities.program.wizard.sections.requirements',
        ),
        content: SelectRequirements,
      },
      {
        label: i18n(
          'entities.program.wizard.sections.complete',
        ),
        content: Complete,
      },
    ].filter(Boolean);

  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const form = useForm({
    resolver: yupResolver(
      schema(steps[activeStep].content),
    ),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    switch (steps[activeStep]?.content) {
      case SelectRequirements: {
        dispatch(
          programTemplateSummarizingActions.fromRequirements(
            form.getValues('requirements'),
            form.getValues('controls'),
          ),
        );
        setActiveStep(activeStep + 1);
        break;
      }
      case Complete: {
        doSubmit && doSubmit(null, values);
        break;
      }
      default: {
        setActiveStep(activeStep + 1);
        break;
      }
    }
  };

  const onClickBack = () => setActiveStep(activeStep - 1);

  const [didStart, setDidStart] = useState(false);

  const templateLoading = useSelector(
    programTemplateViewSelectors.selectLoading,
  );

  const programTemplate = useSelector(
    programTemplateViewSelectors.selectRecord,
  );

  const summarizingLoading = useSelector(
    programTemplateSummarizingSelectors.selectLoading,
  );

  const loading =
    initLoading ||
    saveLoading ||
    templateLoading ||
    summarizingLoading;

  const doStartProgram = (id = null) => {
    if (id) {
      dispatch(programTemplateViewActions.doFind(id));
    }
    setDidStart(id ?? true);
  };

  useEffect(() => {
    if (didStart && didStart !== true && programTemplate) {
      form.register('requirements');
      form.setValue(
        'requirements',
        programTemplate.requirementTemplates?.map(
          ({ id }) => id,
        ) ?? [],
        {
          shouldDirty: true,
          shouldValidate: false,
        },
      );
      form.register('controls');
      form.setValue(
        'controls',
        programTemplate.requirementTemplates?.reduce(
          (total, { id, controlTemplates }) => ({
            ...total,
            [id]: controlTemplates ?? [],
          }),
          {},
        ) ?? {},
        {
          shouldDirty: true,
          shouldValidate: false,
        },
      );
    }
  }, [didStart, programTemplate]);

  const renderStepContent = () => (
    <MDBox p={modal ? 0.8 : 2.4} pt={0}>
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <GradientTitle>
            {didStart ? (
              <>
                {modal &&
                  i18n('entities.program.new.title')}
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                >
                  {steps.map(({ label }, idx) => (
                    <Step key={`new-program-step-${idx}`}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </>
            ) : (
              i18n('entities.program.new.title')
            )}
          </GradientTitle>
        </Grid>
        <Grid item xs={12}>
          {didStart ? (
            <>
              {steps.map(
                (
                  { content: StepContentComponent },
                  idx,
                ) => (
                  <StepContentComponent
                    key={`new-program-step-content-${idx}`}
                    visible={activeStep === idx}
                  />
                ),
              )}
              <MDBox
                mt={1.6}
                width="100%"
                display="flex"
                justifyContent="space-between"
              >
                <MDBox
                  display="inline-flex"
                  flexWrap="wrap"
                  gap={0.8}
                >
                  {activeStep > 0 && (
                    <MDButton
                      color={sidenavColor}
                      disabled={loading}
                      onClick={onClickBack}
                      startIcon={<ArrowBackIcon />}
                      type="button"
                      variant="outlined"
                    >
                      {i18n('common.back')}
                    </MDButton>
                  )}
                  <MDButton
                    color={sidenavColor}
                    disabled={loading}
                    onClick={() => onCancel && onCancel()}
                    startIcon={<CloseIcon />}
                    type="button"
                    variant="outlined"
                  >
                    {i18n('common.cancel')}
                  </MDButton>
                </MDBox>
                <MDBox>
                  <MDButton
                    color={sidenavColor}
                    disabled={loading}
                    endIcon={
                      isLastStep ? (
                        <SaveIcon />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                    onClick={form.handleSubmit(onSubmit)}
                    type="button"
                    variant="gradient"
                  >
                    {i18n(
                      `common.${
                        isLastStep ? 'save' : 'next'
                      }`,
                    )}
                  </MDButton>
                </MDBox>
              </MDBox>
            </>
          ) : (
            <StartProgram onSelect={doStartProgram} />
          )}
          {loading && <Spinner overlap={true} />}
        </Grid>
      </Grid>
    </MDBox>
  );

  const renderFormWrapper = () => (
    <FormWrapper>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          {modal ? (
            renderStepContent()
          ) : (
            <Card sx={{ height: '100%' }}>
              {renderStepContent()}
            </Card>
          )}
        </form>
      </FormProvider>
    </FormWrapper>
  );

  return modal ? (
    renderFormWrapper()
  ) : (
    <Grid container mt={2.4}>
      {didStart && (
        <Grid item xs={12}>
          <MDTypography
            variant="h3"
            textAlign="center"
            mb={4}
          >
            {title}
          </MDTypography>
        </Grid>
      )}
      <Grid item xs={12}>
        {renderFormWrapper()}
      </Grid>
    </Grid>
  );
};

export default ProgramWizard;
