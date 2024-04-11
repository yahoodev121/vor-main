import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramControlTemplateListFilter from 'src/view/programControlTemplate/list/ProgramControlTemplateListFilter';
import ProgramControlTemplateListTable from 'src/view/programControlTemplate/list/ProgramControlTemplateListTable';
import ProgramControlTemplateListToolbar from 'src/view/programControlTemplate/list/ProgramControlTemplateListToolbar';

function ProgramControlTemplateListPage(props) {
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
            {i18n(
              'entities.programControlTemplate.list.title',
            )}
          </MDTypography>
          <ProgramControlTemplateListToolbar />
        </MDBox>
        <ProgramControlTemplateListFilter />
      </MDBox>
      <ProgramControlTemplateListTable />
    </Card>
  );
}

export default ProgramControlTemplateListPage;
