import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/projectStatus/view/projectStatusViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectStatusView from 'src/view/projectStatus/view/ProjectStatusView';
import ProjectStatusViewToolbar from 'src/view/projectStatus/view/ProjectStatusViewToolbar';
import selectors from 'src/modules/projectStatus/view/projectStatusViewSelectors';

function ProjectStatusPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Card>
      <MDBox py={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {i18n('entities.projectStatus.view.title')}
          </MDTypography>
          <ProjectStatusViewToolbar match={match} />
        </MDBox>
        <ProjectStatusView
          loading={loading}
          record={record}
        />
      </MDBox>
    </Card>
  );
}

export default ProjectStatusPage;
