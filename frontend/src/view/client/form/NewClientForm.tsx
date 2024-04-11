import {
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AboutSection from 'src/view/client/form/components/About';
import BusinessSection from 'src/view/client/form/components/Business';
import ComplianceSection from 'src/view/client/form/components/Compliance';
import ContactInformationSection from 'src/view/client/form/components/ContactInformation';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import moment from 'moment';
import RisksSection from 'src/view/client/form/components/Risks';
import TasksSection from 'src/view/client/form/components/Tasks';
import validations from 'src/view/client/form/schemas/validations';

function ClientForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      description: record.description,
      logo: record.logo || [],
      status: record.status,
      category: record.category,
      rating: record.rating,
      location: record.location,
      address: record.address,
      website: record.website,
      industry: record.industry,
      dataProcessed: record.dataProcessed || [],
      dateOnboarded: record.dateOnboarded
        ? moment(
            record.dateOnboarded,
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : null,
      dateOffboarded: record.dateOffboarded
        ? moment(
            record.dateOffboarded,
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )
        : null,
      users: record.users || [],
      infoSecEmail: record.infoSecEmail,
      infoSecPhoneNumber: record.infoSecPhoneNumber,
      privacyEmail: record.privacyEmail,
      privacyPhoneNumber: record.privacyPhoneNumber,
      contract: record.contract || [],
      documentation: record.documentation || [],
      gdprRopa: record.gdprRopa,
      risks: record.risks || [],
      tasks: record.tasks || [],
      tags: record.tags || [],
    };
  });

  const getSteps = (): string[] => {
    return [
      i18n('entities.client.sections.about'),
      i18n('entities.client.sections.contactInformation'),
      i18n('entities.client.sections.business'),
      i18n('entities.client.sections.compliance'),
      i18n('entities.client.sections.risks'),
      i18n('entities.client.sections.tasks'),
    ];
  };

  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const currentValidation = validations[activeStep];

  const form = useForm({
    resolver: yupResolver(currentValidation),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    if (isLastStep) {
      props.onSubmit(props.record?.id, values);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const { saveLoading, modal } = props;

  return (
    <Grid item lg={8} md={9} sm={10} xs={12}>
      <FormWrapper>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            autoComplete="off"
            noValidate
          >
            <Card sx={{ height: '100%' }}>
              <MDBox mx={1.6} topBorder>
                <GradientTitle>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </GradientTitle>
              </MDBox>
              <MDBox p={2.4}>
                <MDBox>
                  <AboutSection
                    visible={activeStep === 0}
                  />
                  <ContactInformationSection
                    visible={activeStep === 1}
                  />
                  <BusinessSection
                    visible={activeStep === 2}
                  />
                  <ComplianceSection
                    visible={activeStep === 3}
                  />
                  <RisksSection
                    visible={activeStep === 4}
                  />
                  <TasksSection
                    visible={activeStep === 5}
                  />
                  <MDBox
                    mt={1.6}
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                  >
                    {activeStep === 0 ? (
                      <MDBox />
                    ) : (
                      <MDButton
                        variant="outlined"
                        color={sidenavColor}
                        onClick={handleBack}
                      >
                        {i18n('common.back')}
                      </MDButton>
                    )}
                    <MDBox
                      display="inline-flex"
                      flexWrap="wrap"
                      gap={0.8}
                    >
                      <MDButton
                        type="button"
                        variant="outlined"
                        color={sidenavColor}
                        onClick={() =>
                          getHistory().push('/client')
                        }
                      >
                        {i18n('common.cancel')}
                      </MDButton>
                      <MDButton
                        type="submit"
                        variant="gradient"
                        color={sidenavColor}
                      >
                        {i18n(
                          `common.${
                            isLastStep ? 'save' : 'next'
                          }`,
                        )}
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </form>
        </FormProvider>
      </FormWrapper>
    </Grid>
  );
}

export default ClientForm;
