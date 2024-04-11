import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import ClientListFilter from 'src/view/client/list/ClientListFilter';
import ClientListTable from 'src/view/client/list/ClientListTable';
import ClientListToolbar from 'src/view/client/list/ClientListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ClientListPage(props) {
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
            {i18n('entities.client.list.title')}
          </MDTypography>
          <ClientListToolbar />
        </MDBox>
        <ClientListFilter />
      </MDBox>
      <ClientListTable />
    </Card>
  );
}

export default ClientListPage;
