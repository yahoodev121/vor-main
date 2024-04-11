import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectListFilter from 'src/view/project/list/ProjectListFilter';
import ProjectListTable from 'src/view/project/list/ProjectListTable';
import ProjectListToolbar from 'src/view/project/list/ProjectListToolbar';

function ProjectListPage(props) {
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
            {i18n('entities.project.list.title')}
          </MDTypography>
          <ProjectListToolbar />
        </MDBox>
        <ProjectListFilter />
      </MDBox>
      <ProjectListTable />
    </Card>
  );
}

export default ProjectListPage;
