import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementTemplateListFilter from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListFilter';
import ProgramRequirementTemplateListTable from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListTable';
import ProgramRequirementTemplateListToolbar from 'src/view/programRequirementTemplate/list/ProgramRequirementTemplateListToolbar';

function ProgramRequirementTemplateListPage(props) {
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
              'entities.programRequirementTemplate.list.title',
            )}
          </MDTypography>
          <ProgramRequirementTemplateListToolbar />
        </MDBox>
        <ProgramRequirementTemplateListFilter />
      </MDBox>
      <ProgramRequirementTemplateListTable />
    </Card>
  );
}

export default ProgramRequirementTemplateListPage;
