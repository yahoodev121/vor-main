import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramControlTemplateService from 'src/modules/programControlTemplate/programControlTemplateService';

const prefix = 'PROGRAMCONTROLTEMPLATE_VIEW';

const programControlTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programControlTemplateViewActions.FIND_STARTED,
      });

      const record =
        await ProgramControlTemplateService.find(id);

      dispatch({
        type: programControlTemplateViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlTemplateViewActions.FIND_ERROR,
      });

      getHistory().push('/program-control-template');
    }
  },
};

export default programControlTemplateViewActions;
