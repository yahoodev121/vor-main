import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import ProgramRequirementGuidanceTemplateListFilter from 'src/view/programRequirementGuidanceTemplate/list/ProgramRequirementGuidanceTemplateListFilter';
import ProgramRequirementGuidanceTemplateListTable from 'src/view/programRequirementGuidanceTemplate/list/ProgramRequirementGuidanceTemplateListTable';
import ProgramRequirementGuidanceTemplateListToolbar from 'src/view/programRequirementGuidanceTemplate/list/ProgramRequirementGuidanceTemplateListToolbar';

function ProgramRequirementGuidanceTemplateListPage(props) {
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
              'entities.programRequirementGuidanceTemplate.list.title',
            )}
          </MDTypography>
          <ProgramRequirementGuidanceTemplateListToolbar />
        </MDBox>
        <ProgramRequirementGuidanceTemplateListFilter />
      </MDBox>
      <ProgramRequirementGuidanceTemplateListTable />
    </Card>
  );
}

export default ProgramRequirementGuidanceTemplateListPage;
