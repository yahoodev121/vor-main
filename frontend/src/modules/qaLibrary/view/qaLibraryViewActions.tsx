import QALibraryService from 'src/modules/qaLibrary/qaLibraryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'QALIBRARY_VIEW';

const qaLibraryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: qaLibraryViewActions.FIND_STARTED,
      });

      const record = await QALibraryService.find(id);

      dispatch({
        type: qaLibraryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: qaLibraryViewActions.FIND_ERROR,
      });

      getHistory().push('/qalibrary');
    }
  },
};

export default qaLibraryViewActions;
