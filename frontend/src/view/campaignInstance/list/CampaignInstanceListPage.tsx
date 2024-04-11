import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import CampaignInstanceListFilter from 'src/view/campaignInstance/list/CampaignInstanceListFilter';
import CampaignInstanceListTable from 'src/view/campaignInstance/list/CampaignInstanceListTable';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function CampaignInstanceListPage(props) {
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
            {i18n('entities.campaignInstance.list.title')}
          </MDTypography>
        </MDBox>
        <CampaignInstanceListFilter />
      </MDBox>
      <CampaignInstanceListTable />
    </Card>
  );
}

export default CampaignInstanceListPage;
