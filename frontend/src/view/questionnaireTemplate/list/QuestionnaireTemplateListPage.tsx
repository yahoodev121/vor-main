import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import QuestionnaireTemplateListFilter from 'src/view/questionnaireTemplate/list/QuestionnaireTemplateListFilter';
import QuestionnaireTemplateListTable from 'src/view/questionnaireTemplate/list/QuestionnaireTemplateListTable';
import QuestionnaireTemplateListToolbar from 'src/view/questionnaireTemplate/list/QuestionnaireTemplateListToolbar';

function QuestionnaireTemplateListPage(props) {
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
              'entities.questionnaireTemplate.list.title',
            )}
          </MDTypography>
          <QuestionnaireTemplateListToolbar />
        </MDBox>
        <QuestionnaireTemplateListFilter />
      </MDBox>
      <QuestionnaireTemplateListTable />
    </Card>
  );
}

export default QuestionnaireTemplateListPage;
