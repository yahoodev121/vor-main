import { i18n } from 'src/i18n';
import CampaignInstanceListFilter from 'src/view/campaignInstance/list/CampaignInstanceListFilter';
import CampaignInstanceListTable from 'src/view/campaignInstance/list/CampaignInstanceListTable';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const CampaignInstanceViewItem = (props) => {
  return (
    <>
      <MDBox
        display="flex"
        gap={4}
        pt={2.4}
        px={2.4}
        topBorder
      >
        <MDTypography variant="h5">
          {i18n('entities.campaignInstance.label')}
        </MDTypography>
        <MDBox flexGrow={1}>
          <CampaignInstanceListFilter {...props} />
        </MDBox>
      </MDBox>
      <CampaignInstanceListTable />
    </>
  );
};

CampaignInstanceViewItem.defaultProps = {
  contains: true,
  ownerCampaign: null,
  ownerClient: null,
  ownerVendor: null,
};

export default CampaignInstanceViewItem;
