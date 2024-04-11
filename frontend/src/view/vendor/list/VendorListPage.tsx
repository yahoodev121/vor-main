import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import VendorListFilter from 'src/view/vendor/list/VendorListFilter';
import VendorListTable from 'src/view/vendor/list/VendorListTable';
import VendorListToolbar from 'src/view/vendor/list/VendorListToolbar';

function VendorListPage(props) {
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
            {i18n('entities.vendor.list.title')}
          </MDTypography>
          <VendorListToolbar />
        </MDBox>
        <VendorListFilter />
      </MDBox>
      <VendorListTable />
    </Card>
  );
}

export default VendorListPage;
