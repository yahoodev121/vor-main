import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/campaign/view/campaignViewActions';
import CampaignInstanceListFilter from 'src/view/campaignInstance/list/CampaignInstanceListFilter';
import CampaignInstanceListTable from 'src/view/campaignInstance/list/CampaignInstanceListTable';
import CampaignViewToolbar from 'src/view/campaign/view/CampaignViewToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/campaign/view/campaignViewSelectors';
import Spinner from 'src/view/shared/Spinner';

function CampaignPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Card>
      <MDBox pt={2.4} px={2.4} topBorder>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h3" mb={2.4}>
            {record?.name ??
              i18n('entities.campaign.view.title')}
          </MDTypography>
          <CampaignViewToolbar match={match} />
        </MDBox>
        <CampaignInstanceListFilter
          contains={true}
          ownerCampaign={match.params.id}
        />
      </MDBox>
      <CampaignInstanceListTable record={record} />
    </Card>
  );
}

export default CampaignPage;
