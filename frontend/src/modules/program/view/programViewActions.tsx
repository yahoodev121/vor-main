import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramService from 'src/modules/program/programService';

const prefix = 'PROGRAM_VIEW';

const programViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programViewActions.FIND_STARTED,
      });

      const record = await ProgramService.find(id);

      dispatch({
        type: programViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programViewActions.FIND_ERROR,
      });

      getHistory().push('/program');
    }
  },
};

export default programViewActions;
