import CampaignService from 'src/modules/campaign/campaignService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CAMPAIGN_VIEW';

const campaignViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignViewActions.FIND_STARTED,
      });

      const record = await CampaignService.find(id);

      dispatch({
        type: campaignViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignViewActions.FIND_ERROR,
      });

      getHistory().push('/campaign');
    }
  },
};

export default campaignViewActions;
