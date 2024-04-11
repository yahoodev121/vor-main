import Errors from 'src/modules/shared/error/errors';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';

const prefix = 'PROGRAMTEMPLATE_SUMMARIZING';

const programTemplateSummarizingActions = {
  FROM_REQUIREMENTS_STARTED: `${prefix}_FROM_REQUIREMENTS_STARTED`,
  FROM_REQUIREMENTS_SUCCESS: `${prefix}_FROM_REQUIREMENTS_SUCCESS`,
  FROM_REQUIREMENTS_ERROR: `${prefix}_FROM_REQUIREMENTS_ERROR`,

  fromRequirements:
    (requirements = [], controls = {}) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: programTemplateSummarizingActions.FROM_REQUIREMENTS_STARTED,
        });

        const response =
          await ProgramTemplateService.summarizingFromRequirements(
            requirements,
            controls,
          );

        dispatch({
          type: programTemplateSummarizingActions.FROM_REQUIREMENTS_SUCCESS,
          payload: response,
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: programTemplateSummarizingActions.FROM_REQUIREMENTS_ERROR,
        });
      }
    },
};

export default programTemplateSummarizingActions;
