import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/program/list/programListActions';
import Message from 'src/view/shared/message';
import ProgramService from 'src/modules/program/programService';

const prefix = 'PROGRAM_DESTROY';

const programDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programDestroyActions.DESTROY_STARTED,
      });

      await ProgramService.destroyAll([id]);

      dispatch({
        type: programDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.program.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/program');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: programDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProgramService.destroyAll(ids);

      dispatch({
        type: programDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.program.destroyAll.success'),
      );

      getHistory().push('/program');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default programDestroyActions;
