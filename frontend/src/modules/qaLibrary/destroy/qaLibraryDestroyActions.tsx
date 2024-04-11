import listActions from 'src/modules/qaLibrary/list/qaLibraryListActions';
import QALibraryService from 'src/modules/qaLibrary/qaLibraryService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'QALIBRARY_DESTROY';

const qaLibraryDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: qaLibraryDestroyActions.DESTROY_STARTED,
      });

      await QALibraryService.destroyAll([id]);

      dispatch({
        type: qaLibraryDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.qaLibrary.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/qalibrary');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: qaLibraryDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: qaLibraryDestroyActions.DESTROY_ALL_STARTED,
      });

      await QALibraryService.destroyAll(ids);

      dispatch({
        type: qaLibraryDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.qaLibrary.destroyAll.success'),
      );

      getHistory().push('/qalibrary');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: qaLibraryDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default qaLibraryDestroyActions;
