import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListActions';
import Message from 'src/view/shared/message';
import ProgramRequirementTemplateService from 'src/modules/programRequirementTemplate/programRequirementTemplateService';

const prefix = 'PROGRAMREQUIREMENTTEMPLATE_DESTROY';

const programRequirementTemplateDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy:
    (id, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_STARTED,
        });

        await ProgramRequirementTemplateService.destroyAll([
          id,
        ]);

        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n(
            'entities.programRequirementTemplate.destroy.success',
          ),
        );

        dispatch(listActions.doFetchCurrentFilter());

        if (redirect) {
          getHistory().push(
            '/program-requirement-template',
          );
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll:
    (ids, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_ALL_STARTED,
        });

        await ProgramRequirementTemplateService.destroyAll(
          ids,
        );

        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doClearAllSelected());
          dispatch(listActions.doFetchCurrentFilter());
        }

        Message.success(
          i18n(
            'entities.programRequirementTemplate.destroyAll.success',
          ),
        );

        if (redirect) {
          getHistory().push(
            '/program-requirement-template',
          );
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programRequirementTemplateDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default programRequirementTemplateDestroyActions;
