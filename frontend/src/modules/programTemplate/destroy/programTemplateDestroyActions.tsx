import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programTemplate/list/programTemplateListActions';
import Message from 'src/view/shared/message';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';

const prefix = 'PROGRAMTEMPLATE_DESTROY';

const programTemplateDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programTemplateDestroyActions.DESTROY_STARTED,
      });

      await ProgramTemplateService.destroyAll([id]);

      dispatch({
        type: programTemplateDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.programTemplate.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/program-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programTemplateDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: programTemplateDestroyActions.DESTROY_ALL_STARTED,
      });

      await ProgramTemplateService.destroyAll(ids);

      dispatch({
        type: programTemplateDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.programTemplate.destroyAll.success'),
      );

      getHistory().push('/program-template');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: programTemplateDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default programTemplateDestroyActions;
