import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import HighlightService from 'src/modules/highlight/highlightService';
import listActions from 'src/modules/highlight/list/highlightListActions';
import Message from 'src/view/shared/message';

const prefix = 'HIGHLIGHT_DESTROY';

const highlightDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: highlightDestroyActions.DESTROY_STARTED,
      });

      await HighlightService.destroyAll([id]);

      dispatch({
        type: highlightDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.highlight.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/highlight');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: highlightDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: highlightDestroyActions.DESTROY_ALL_STARTED,
      });

      await HighlightService.destroyAll(ids);

      dispatch({
        type: highlightDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.highlight.destroyAll.success'),
      );

      getHistory().push('/highlight');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: highlightDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default highlightDestroyActions;
