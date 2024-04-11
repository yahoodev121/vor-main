import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/vendor/view/vendorViewActions';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import HighlightIcon from '@mui/icons-material/Highlight';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import riskListActions from 'src/modules/risk/list/riskListActions';
import selectors from 'src/modules/vendor/view/vendorViewSelectors';
import taskListActions from 'src/modules/task/list/taskListActions';
import VendorView from 'src/view/vendor/view/VendorView';
import VendorViewToolbar from 'src/view/vendor/view/VendorViewToolbar';
import HighlightListPageModal from 'src/view/highlight/list/HighlightListPageModal';

function VendorPage() {
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
    window.location.hash = 'tasks-on-vendor';
  };

  const handleOpenRisks = () => {
    window.location.hash = '';
    dispatch(riskListActions.doFetchOpenRisksOnly());
    window.location.hash = 'risks-on-vendor';
  };

  const handleHighlights = () => {
    window.location.hash = '';
    window.location.hash = 'highlights-on-vendor';
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
                  {i18n('entities.vendor.view.title')}
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
                      'entities.vendor.openRisks',
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
                      'entities.vendor.openTasks',
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
                <VendorViewToolbar match={match} />
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid xs={12} item>
          <VendorView loading={loading} record={record} />
        </Grid>
      </Grid>
      {visibleHighlightListModal && (
        <HighlightListPageModal
          type="vendor"
          typeId={match.params.id}
          onClose={() =>
            setVisibleHighlightListModal(false)
          }
        />
      )}
    </>
  );
}

export default VendorPage;
