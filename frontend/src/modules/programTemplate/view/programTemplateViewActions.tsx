import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';

const prefix = 'PROGRAMTEMPLATE_VIEW';

const programTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programTemplateViewActions.FIND_STARTED,
      });

      const record = await ProgramTemplateService.find(id);

      dispatch({
        type: programTemplateViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programTemplateViewActions.FIND_ERROR,
      });

      getHistory().push('/program-template');
    }
  },
};

export default programTemplateViewActions;
