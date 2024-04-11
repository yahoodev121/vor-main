import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import programTemplateSummarizingSelectors from 'src/modules/programTemplate/summarizing/programTemplateSummarizingSelectors';
import Spinner from 'src/view/shared/Spinner';
import StepContent from 'src/view/shared/components/StepContent';
import TextViewItem from 'src/view/shared/view/TextViewItem';

const Complete = ({ visible = false }) => {
  const { sidenavColor } = selectMuiSettings();

  const { getValues, setValue, register } =
    useFormContext();

  const formName = getValues('name');
  const formDescription = getValues('description');

  const { requirements, controls, loading } = useSelector(
    programTemplateSummarizingSelectors.selectRaw,
  );

  const CardSection = ({ title, description }) => (
    <Grid item md={3} xs={12}>
      <Card sx={{ height: '100%' }}>
        <MDBox p={2.4}>
          <MDTypography
            variant="h2"
            color={sidenavColor}
            textAlign="center"
          >
            {title}
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight="bold"
            textAlign="center"
          >
            {description}
          </MDTypography>
        </MDBox>
      </Card>
    </Grid>
  );

  return (
    <StepContent
      title={i18n(
        'entities.program.wizard.sections.complete',
      )}
      visible={visible}
    >
      <Grid spacing={1.6} container>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('entities.program.fields.name')}
            value={formName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.program.fields.description',
            )}
            value={formDescription}
            multiline={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={1.6}
            justifyContent="center"
          >
            <CardSection
              title={requirements}
              description={i18n(
                'entities.program.fields.requirements',
              )}
            />
            <CardSection
              title={controls}
              description={i18n(
                'entities.program.fields.controls',
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      {loading && <Spinner overlap={true} />}
    </StepContent>
  );
};

export default Complete;
