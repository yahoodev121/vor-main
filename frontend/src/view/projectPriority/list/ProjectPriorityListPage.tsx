import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectPriorityListFilter from 'src/view/projectPriority/list/ProjectPriorityListFilter';
import ProjectPriorityListTable from 'src/view/projectPriority/list/ProjectPriorityListTable';
import ProjectPriorityListToolbar from 'src/view/projectPriority/list/ProjectPriorityListToolbar';

function ProjectPriorityListPage(props) {
  return (
    <Card>
      <MDBox pt={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          pb={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.projectPriority.list.title')}
          </MDTypography>
          <ProjectPriorityListToolbar />
        </MDBox>
        <ProjectPriorityListFilter />
      </MDBox>
      <ProjectPriorityListTable />
    </Card>
  );
}

export default ProjectPriorityListPage;
