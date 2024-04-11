import { getHistory } from 'src/modules/store';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/campaignInstance/form/campaignInstanceFormActions';
import CampaignInstanceView from 'src/view/campaignInstance/view/CampaignInstanceView';
import selectors from 'src/modules/campaignInstance/form/campaignInstanceFormSelectors';
import Spinner from 'src/view/shared/Spinner';

function CampaignInstanceViewPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doInit(match.params.instance));
    setDispatched(true);
  }, [dispatch, match.params.instance]);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
      >
        {initLoading && <Spinner />}

        {dispatched && !initLoading && (
          <CampaignInstanceView
            initLoading={initLoading}
            saveLoading={saveLoading}
            record={record ?? {}}
            onCancel={() => {
              getHistory().push(
                `/campaign/${match.params.id}`,
              );
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default CampaignInstanceViewPage;
