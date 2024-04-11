import NoteService from 'src/modules/note/noteService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NOTE_VIEW';

const noteViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: noteViewActions.FIND_STARTED,
      });

      const record = await NoteService.find(id);

      dispatch({
        type: noteViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: noteViewActions.FIND_ERROR,
      });

      getHistory().push('/note');
    }
  },
};

export default noteViewActions;
