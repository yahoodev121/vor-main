import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programControl/list/programControlListActions';
import Message from 'src/view/shared/message';
import ProgramControlService from 'src/modules/programControl/programControlService';
import programListActions from 'src/modules/program/list/programListActions';
import programRequirementListActions from 'src/modules/programRequirement/list/programRequirementListActions';

const prefix = 'PROGRAMCONTROL_DESTROY';

const programControlDestroyActions = {
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
          type: programControlDestroyActions.DESTROY_STARTED,
        });

        await ProgramControlService.destroyAll([id]);

        dispatch({
          type: programControlDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n('entities.programControl.destroy.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(programListActions.doFetchCurrentFilter());
        dispatch(
          programRequirementListActions.doFetchCurrentFilter(),
        );

        if (redirect) {
          getHistory().push('/program-control');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programControlDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll:
    (ids, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: programControlDestroyActions.DESTROY_ALL_STARTED,
        });

        await ProgramControlService.destroyAll(ids);

        dispatch({
          type: programControlDestroyActions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doClearAllSelected());
          dispatch(listActions.doFetchCurrentFilter());
        }
        dispatch(programListActions.doFetchCurrentFilter());
        dispatch(
          programRequirementListActions.doFetchCurrentFilter(),
        );

        Message.success(
          i18n(
            'entities.programControl.destroyAll.success',
          ),
        );

        if (redirect) {
          getHistory().push('/program-control');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: programControlDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default programControlDestroyActions;
