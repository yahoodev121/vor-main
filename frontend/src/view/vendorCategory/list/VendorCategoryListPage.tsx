import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import VendorCategoryListFilter from 'src/view/vendorCategory/list/VendorCategoryListFilter';
import VendorCategoryListTable from 'src/view/vendorCategory/list/VendorCategoryListTable';
import VendorCategoryListToolbar from 'src/view/vendorCategory/list/VendorCategoryListToolbar';

function VendorCategoryListPage(props) {
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
            {i18n('entities.vendorCategory.list.title')}
          </MDTypography>
          <VendorCategoryListToolbar />
        </MDBox>
        <VendorCategoryListFilter />
      </MDBox>
      <VendorCategoryListTable />
    </Card>
  );
}

export default VendorCategoryListPage;
