import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementTemplateService from 'src/modules/programRequirementTemplate/programRequirementTemplateService';

const prefix = 'PROGRAMREQUIREMENTTEMPLATE_VIEW';

const programRequirementTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementTemplateViewActions.FIND_STARTED,
      });

      const record =
        await ProgramRequirementTemplateService.find(id);

      dispatch({
        type: programRequirementTemplateViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementTemplateViewActions.FIND_ERROR,
      });

      getHistory().push('/program-requirement-template');
    }
  },
};

export default programRequirementTemplateViewActions;
