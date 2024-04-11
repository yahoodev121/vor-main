import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import ClientCategoryListFilter from 'src/view/clientCategory/list/ClientCategoryListFilter';
import ClientCategoryListTable from 'src/view/clientCategory/list/ClientCategoryListTable';
import ClientCategoryListToolbar from 'src/view/clientCategory/list/ClientCategoryListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ClientCategoryListPage(props) {
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
            {i18n('entities.clientCategory.list.title')}
          </MDTypography>
          <ClientCategoryListToolbar />
        </MDBox>
        <ClientCategoryListFilter />
      </MDBox>
      <ClientCategoryListTable />
    </Card>
  );
}

export default ClientCategoryListPage;
