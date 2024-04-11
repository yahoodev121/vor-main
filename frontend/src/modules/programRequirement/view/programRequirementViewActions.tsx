import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';

const prefix = 'PROGRAMREQUIREMENT_VIEW';

const programRequirementViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementViewActions.FIND_STARTED,
      });

      const record = await ProgramRequirementService.find(
        id,
      );

      dispatch({
        type: programRequirementViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementViewActions.FIND_ERROR,
      });

      getHistory().push('/program-requirement');
    }
  },
};

export default programRequirementViewActions;
