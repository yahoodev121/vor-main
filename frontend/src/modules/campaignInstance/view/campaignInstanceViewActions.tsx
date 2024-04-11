import CampaignInstanceService from 'src/modules/campaignInstance/campaignInstanceService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CAMPAIGNINSTANCE_VIEW';

const campaignInstanceViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignInstanceViewActions.FIND_STARTED,
      });

      const record = await CampaignInstanceService.find(id);

      dispatch({
        type: campaignInstanceViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignInstanceViewActions.FIND_ERROR,
      });

      getHistory().push('/campaign-instance');
    }
  },
};

export default campaignInstanceViewActions;
