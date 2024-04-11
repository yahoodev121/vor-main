import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectStatusListFilter from 'src/view/projectStatus/list/ProjectStatusListFilter';
import ProjectStatusListTable from 'src/view/projectStatus/list/ProjectStatusListTable';
import ProjectStatusListToolbar from 'src/view/projectStatus/list/ProjectStatusListToolbar';

function ProjectStatusListPage(props) {
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
            {i18n('entities.projectStatus.list.title')}
          </MDTypography>
          <ProjectStatusListToolbar />
        </MDBox>
        <ProjectStatusListFilter />
      </MDBox>
      <ProjectStatusListTable />
    </Card>
  );
}

export default ProjectStatusListPage;
