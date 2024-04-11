import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/programRequirementGuidanceTemplate/view/programRequirementGuidanceTemplateViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementGuidanceTemplateView from 'src/view/programRequirementGuidanceTemplate/view/ProgramRequirementGuidanceTemplateView';
import ProgramRequirementGuidanceTemplateViewToolbar from 'src/view/programRequirementGuidanceTemplate/view/ProgramRequirementGuidanceTemplateViewToolbar';
import selectors from 'src/modules/programRequirementGuidanceTemplate/view/programRequirementGuidanceTemplateViewSelectors';

function ProgramRequirementGuidanceTemplatePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Grid spacing={1.6} container>
      <Grid xs={12} item>
        <Card>
          <MDBox p={2.4} topBorder>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h4">
                {i18n(
                  'entities.programRequirementGuidanceTemplate.view.title',
                )}
              </MDTypography>
              <ProgramRequirementGuidanceTemplateViewToolbar
                match={match}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <ProgramRequirementGuidanceTemplateView
          loading={loading}
          record={record}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramRequirementGuidanceTemplatePage;
