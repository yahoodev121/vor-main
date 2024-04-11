import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/programRequirement/view/programRequirementViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementView from 'src/view/programRequirement/view/ProgramRequirementView';
import ProgramRequirementViewToolbar from 'src/view/programRequirement/view/ProgramRequirementViewToolbar';
import selectors from 'src/modules/programRequirement/view/programRequirementViewSelectors';

function ProgramRequirementPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [rerender, setRerender] = useState(0);

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id, rerender]);

  const reloading = () => {
    setRerender(rerender + 1);
  };

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
                  'entities.programRequirement.view.title',
                )}
              </MDTypography>
              <ProgramRequirementViewToolbar
                match={match}
              />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <ProgramRequirementView
          loading={loading}
          record={record}
          reloading={reloading}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramRequirementPage;
