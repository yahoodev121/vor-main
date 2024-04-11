import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/highlight/view/highlightViewActions';
import HighlightView from 'src/view/highlight/view/HighlightView';
import HighlightViewToolbar from 'src/view/highlight/view/HighlightViewToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/highlight/view/highlightViewSelectors';
import Spinner from 'src/view/shared/Spinner';

function HighlightPage() {
  const dispatch = useDispatch();
  const [dispatched, setDispatched] = useState(false);
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  return (
    <>
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
                  {i18n('entities.highlight.view.title')}
                </MDTypography>
                <HighlightViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          {loading && <Spinner />}
          {dispatched && !loading && (
            <HighlightView record={record} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default HighlightPage;
