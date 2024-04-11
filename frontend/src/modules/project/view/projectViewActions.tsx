import ProjectService from 'src/modules/project/projectService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROJECT_VIEW';

const projectViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectViewActions.FIND_STARTED,
      });

      const record = await ProjectService.find(id);

      dispatch({
        type: projectViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectViewActions.FIND_ERROR,
      });

      getHistory().push('/project');
    }
  },
};

export default projectViewActions;
