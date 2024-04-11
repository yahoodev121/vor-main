import listActions from 'src/modules/campaign/list/campaignListActions';
import CampaignService from 'src/modules/campaign/campaignService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CAMPAIGN_DESTROY';

const campaignDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignDestroyActions.DESTROY_STARTED,
      });

      await CampaignService.destroyAll([id]);

      dispatch({
        type: campaignDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.campaign.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/campaign');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: campaignDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: campaignDestroyActions.DESTROY_ALL_STARTED,
      });

      await CampaignService.destroyAll(ids);

      dispatch({
        type: campaignDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.campaign.destroyAll.success'),
      );

      getHistory().push('/campaign');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: campaignDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default campaignDestroyActions;
