import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/client/view/clientViewActions';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ClientView from 'src/view/client/view/ClientView';
import ClientViewToolbar from 'src/view/client/view/ClientViewToolbar';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import HighlightIcon from '@mui/icons-material/Highlight';
import HighlightListPageModal from 'src/view/highlight/list/HighlightListPageModal';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import riskListActions from 'src/modules/risk/list/riskListActions';
import selectors from 'src/modules/client/view/clientViewSelectors';
import taskListActions from 'src/modules/task/list/taskListActions';

function ClientPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  const [
    visibleHighlightListModal,
    setVisibleHighlightListModal,
  ] = useState(false);

  const handleOpenTasks = () => {
    window.location.hash = '';
    dispatch(taskListActions.doFetchOpenTasksOnly());
    window.location.hash = 'tasks-on-client';
  };

  const handleOpenRisks = () => {
    window.location.hash = '';
    dispatch(riskListActions.doFetchOpenRisksOnly());
    window.location.hash = 'risks-on-client';
  };

  const handleHighlights = () => {
    window.location.hash = '';
    window.location.hash = 'highlights-on-client';
  };

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
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
                  {i18n('entities.client.view.title')}
                </MDTypography>
                {Boolean(record?.openRisks) && (
                  <MDButton
                    variant="outlined"
                    color="error"
                    startIcon={<GppMaybeIcon />}
                    size="small"
                    onClick={handleOpenRisks}
                  >
                    {i18n(
                      'entities.client.openRisks',
                      record.openRisks,
                    )}
                  </MDButton>
                )}
                {Boolean(record?.openTasks) && (
                  <MDButton
                    variant="outlined"
                    color="info"
                    startIcon={<AssignmentIcon />}
                    size="small"
                    onClick={handleOpenTasks}
                  >
                    {i18n(
                      'entities.client.openTasks',
                      record.openTasks,
                    )}
                  </MDButton>
                )}
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<HighlightIcon />}
                  size="small"
                  onClick={handleHighlights}
                >
                  {i18n('entities.highlight.label')}
                </MDButton>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() =>
                    setVisibleHighlightListModal(true)
                  }
                >
                  {i18n('entities.highlight.label')}
                </MDButton>
                <ClientViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          <ClientView loading={loading} record={record} />
        </Grid>
      </Grid>
      {visibleHighlightListModal && (
        <HighlightListPageModal
          type="client"
          typeId={match.params.id}
          onClose={() =>
            setVisibleHighlightListModal(false)
          }
        />
      )}
    </>
  );
}

export default ClientPage;
