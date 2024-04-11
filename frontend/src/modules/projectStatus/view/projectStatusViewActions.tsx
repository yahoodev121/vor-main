import ProjectStatusService from 'src/modules/projectStatus/projectStatusService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROJECTSTATUS_VIEW';

const projectStatusViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectStatusViewActions.FIND_STARTED,
      });

      const record = await ProjectStatusService.find(id);

      dispatch({
        type: projectStatusViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectStatusViewActions.FIND_ERROR,
      });

      getHistory().push('/project-status');
    }
  },
};

export default projectStatusViewActions;
