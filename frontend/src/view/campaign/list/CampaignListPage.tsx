import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import CampaignListFilter from 'src/view/campaign/list/CampaignListFilter';
import CampaignListTable from 'src/view/campaign/list/CampaignListTable';
import CampaignListToolbar from 'src/view/campaign/list/CampaignListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function CampaignListPage(props) {
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
            {i18n('entities.campaign.list.title')}
          </MDTypography>
          <CampaignListToolbar />
        </MDBox>
        <CampaignListFilter />
      </MDBox>
      <CampaignListTable />
    </Card>
  );
}

export default CampaignListPage;
