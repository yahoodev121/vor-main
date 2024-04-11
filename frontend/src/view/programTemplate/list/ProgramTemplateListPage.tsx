import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramTemplateListFilter from 'src/view/programTemplate/list/ProgramTemplateListFilter';
import ProgramTemplateListTable from 'src/view/programTemplate/list/ProgramTemplateListTable';
import ProgramTemplateListToolbar from 'src/view/programTemplate/list/ProgramTemplateListToolbar';

function ProgramTemplateListPage(props) {
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
            {i18n('entities.programTemplate.list.title')}
          </MDTypography>
          <ProgramTemplateListToolbar />
        </MDBox>
        <ProgramTemplateListFilter />
      </MDBox>
      <ProgramTemplateListTable />
    </Card>
  );
}

export default ProgramTemplateListPage;
