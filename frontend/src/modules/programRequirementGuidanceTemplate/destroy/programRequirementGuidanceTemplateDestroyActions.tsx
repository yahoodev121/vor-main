import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programRequirementGuidanceTemplate/list/programRequirementGuidanceTemplateListActions';
import Message from 'src/view/shared/message';
import ProgramRequirementGuidanceTemplateService from 'src/modules/programRequirementGuidanceTemplate/programRequirementGuidanceTemplateService';

const prefix = 'PROGRAMREQUIREMENTGUIDANCETEMPLATE_DESTROY';

const programRequirementGuidanceTemplateDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_STARTED,
      });

      await ProgramRequirementGuidanceTemplateService.destroyAll(
        [id],
      );

      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n(
          'entities.programRequirementGuidanceTemplate.destroy.success',
        ),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push(
        '/program-requirement-guidance-template',
      );
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProgramRequirementGuidanceTemplateService.destroyAll(
        ids,
      );

      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n(
          'entities.programRequirementGuidanceTemplate.destroyAll.success',
        ),
      );

      getHistory().push(
        '/program-requirement-guidance-template',
      );
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programRequirementGuidanceTemplateDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default programRequirementGuidanceTemplateDestroyActions;
