import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementGuidanceTemplateService from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateService';

const prefix = 'PROGRAMREQUIREMENTGUIDANCETEMPLATE_VIEW';

const programRequirementGuidanceTemplateViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementGuidanceTemplateViewActions.FIND_STARTED,
      });

      const record =
        await ProgramRequirementGuidanceTemplateService.find(
          id,
        );

      dispatch({
        type: programRequirementGuidanceTemplateViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementGuidanceTemplateViewActions.FIND_ERROR,
      });

      getHistory().push(
        '/program-requirement-guidance-template',
      );
    }
  },
};

export default programRequirementGuidanceTemplateViewActions;
