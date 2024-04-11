import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/program/view/programViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramView from 'src/view/program/view/ProgramView';
import ProgramViewToolbar from 'src/view/program/view/ProgramViewToolbar';
import selectors from 'src/modules/program/view/programViewSelectors';

function ProgramPage() {
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
                {i18n('entities.program.view.title')}
              </MDTypography>
              <ProgramViewToolbar match={match} />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <ProgramView
          reloading={reloading}
          loading={loading}
          record={record}
        />
      </Grid>
    </Grid>
  );
}

export default ProgramPage;
