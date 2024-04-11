import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programControlTemplate/list/programControlTemplateListActions';
import Message from 'src/view/shared/message';
import ProgramControlTemplateService from 'src/modules/programControlTemplate/programControlTemplateService';

const prefix = 'PROGRAMCONTROLTEMPLATE_DESTROY';

const programControlTemplateDestroyActions = {
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
          type: programControlTemplateDestroyActions.DESTROY_STARTED,
        });

        await ProgramControlTemplateService.destroyAll([
          id,
        ]);

        dispatch({
          type: programControlTemplateDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n(
            'entities.programControlTemplate.destroy.success',
          ),
        );

        dispatch(listActions.doFetchCurrentFilter());

        if (redirect) {
          getHistory().push('/program-control-template');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programControlTemplateDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll:
    (ids, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: programControlTemplateDestroyActions.DESTROY_ALL_STARTED,
        });

        await ProgramControlTemplateService.destroyAll(ids);

        dispatch({
          type: programControlTemplateDestroyActions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doClearAllSelected());
          dispatch(listActions.doFetchCurrentFilter());
        }

        Message.success(
          i18n(
            'entities.programControlTemplate.destroyAll.success',
          ),
        );

        if (redirect) {
          getHistory().push('/program-control-template');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programControlTemplateDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default programControlTemplateDestroyActions;
