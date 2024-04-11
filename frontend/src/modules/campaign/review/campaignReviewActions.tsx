import CampaignService from 'src/modules/campaign/campaignService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CAMPAIGN_REVIEW';

const campaignReviewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,
  RESET: `${prefix}_RESET`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: campaignReviewActions.RESET,
    });
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignReviewActions.FIND_STARTED,
      });

      const record = await CampaignService.review(id);

      dispatch({
        type: campaignReviewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: campaignReviewActions.FIND_ERROR,
      });

      getHistory().push('/campaign');
    }
  },
};

export default campaignReviewActions;
