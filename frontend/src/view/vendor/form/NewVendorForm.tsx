import {
  Card,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AboutSection from 'src/view/vendor/form/components/About';
import BusinessSection from 'src/view/vendor/form/components/Business';
import ComplianceSection from 'src/view/vendor/form/components/Compliance';
import ContactInformationSection from 'src/view/vendor/form/components/ContactInformation';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import RisksSection from 'src/view/vendor/form/components/Risks';
import TasksSection from 'src/view/vendor/form/components/Tasks';
import validations from 'src/view/vendor/form/schemas/validations';

function VendorForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      status: record.status,
      category: record.category,
      rating: record.rating,
      countryOfIncorporation: record.countryOfIncorporation,
      dataProcessed: record.dataProcessed || [],
      industry: record.industry,
      users: record.users || [],
      supportEmail: record.supportEmail,
      supportPhoneNumber: record.supportPhoneNumber,
      infoSecEmail: record.infoSecEmail,
      infoSecPhoneNumber: record.infoSecPhoneNumber,
      privacyEmail: record.privacyEmail,
      privacyPhoneNumber: record.privacyPhoneNumber,
      internalBusinessSponsor:
        record.internalBusinessSponsor,
      descriptionOfServices: record.descriptionOfServices,
      logo: record.logo || [],
      website: record.website,
      address: record.address,
      contract: record.contract || [],
      documentation: record.documentation || [],
      dpiaCompleted: record.dpiaCompleted,
      dtiaCompleted: record.dtiaCompleted,
      iso27001: record.iso27001,
      soc1: record.soc1,
      soc2: record.soc2,
      hippa: record.hippa,
      pcidss: record.pcidss,
      fedramp: record.fedramp,
      gdpr: record.gdpr,
      ccpa: record.ccpa,
      sox: record.sox,
      cobit: record.cobit,
      risks: record.risks || [],
      tasks: record.tasks || [],
      tags: record.tags || [],
    };
  });

  const getSteps = (): string[] => {
    return [
      i18n('entities.vendor.sections.about'),
      i18n('entities.vendor.sections.contactInformation'),
      i18n('entities.vendor.sections.business'),
      i18n('entities.vendor.sections.compliance'),
      i18n('entities.vendor.sections.risks'),
      i18n('entities.vendor.sections.tasks'),
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
              <MDBox mx={1.6}>
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
                          getHistory().push('/vendor')
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

export default VendorForm;
