import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProjectTypeListFilter from 'src/view/projectType/list/ProjectTypeListFilter';
import ProjectTypeListTable from 'src/view/projectType/list/ProjectTypeListTable';
import ProjectTypeListToolbar from 'src/view/projectType/list/ProjectTypeListToolbar';

function ProjectTypeListPage(props) {
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
            {i18n('entities.projectType.list.title')}
          </MDTypography>
          <ProjectTypeListToolbar />
        </MDBox>
        <ProjectTypeListFilter />
      </MDBox>
      <ProjectTypeListTable />
    </Card>
  );
}

export default ProjectTypeListPage;
