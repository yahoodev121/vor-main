import ProjectTypeService from 'src/modules/projectType/projectTypeService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROJECTTYPE_VIEW';

const projectTypeViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectTypeViewActions.FIND_STARTED,
      });

      const record = await ProjectTypeService.find(id);

      dispatch({
        type: projectTypeViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectTypeViewActions.FIND_ERROR,
      });

      getHistory().push('/project-type');
    }
  },
};

export default projectTypeViewActions;
