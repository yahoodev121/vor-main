import ProjectPriorityService from 'src/modules/projectPriority/projectPriorityService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROJECTPRIORITY_VIEW';

const projectPriorityViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectPriorityViewActions.FIND_STARTED,
      });

      const record = await ProjectPriorityService.find(id);

      dispatch({
        type: projectPriorityViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectPriorityViewActions.FIND_ERROR,
      });

      getHistory().push('/project-priority');
    }
  },
};

export default projectPriorityViewActions;
