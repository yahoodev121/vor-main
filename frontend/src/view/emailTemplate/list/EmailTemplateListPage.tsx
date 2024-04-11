import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import EmailTemplateListFilter from 'src/view/emailTemplate/list/EmailTemplateListFilter';
import EmailTemplateListTable from 'src/view/emailTemplate/list/EmailTemplateListTable';
import EmailTemplateListToolbar from 'src/view/emailTemplate/list/EmailTemplateListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function EmailTemplateListPage(props) {
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
            {i18n('entities.emailTemplate.list.title')}
          </MDTypography>
          <EmailTemplateListToolbar />
        </MDBox>
        <EmailTemplateListFilter />
      </MDBox>
      <EmailTemplateListTable />
    </Card>
  );
}

export default EmailTemplateListPage;
