import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/programControlTemplate/view/programControlTemplateViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramControlTemplateView from 'src/view/programControlTemplate/view/ProgramControlTemplateView';
import ProgramControlTemplateViewToolbar from 'src/view/programControlTemplate/view/ProgramControlTemplateViewToolbar';
import selectors from 'src/modules/programControlTemplate/view/programControlTemplateViewSelectors';

function ProgramControlTemplatePage() {
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
                  'entities.programControlTemplate.view.title',
                )}
              </MDTypography>
              <ProgramControlTemplateViewToolbar
                match={match}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <ProgramControlTemplateView
          loading={loading}
          record={record}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramControlTemplatePage;
