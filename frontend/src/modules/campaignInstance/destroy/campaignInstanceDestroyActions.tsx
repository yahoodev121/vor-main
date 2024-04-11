import listActions from 'src/modules/campaignInstance/list/campaignInstanceListActions';
import CampaignInstanceService from 'src/modules/campaignInstance/campaignInstanceService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'CAMPAIGNINSTANCE_DESTROY';

const campaignInstanceDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_STARTED,
      });

      await CampaignInstanceService.destroyAll([id]);

      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.campaignInstance.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/campaign-instance');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_ALL_STARTED,
      });

      await CampaignInstanceService.destroyAll(ids);

      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n(
          'entities.campaignInstance.destroyAll.success',
        ),
      );

      getHistory().push('/campaign-instance');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: campaignInstanceDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default campaignInstanceDestroyActions;
