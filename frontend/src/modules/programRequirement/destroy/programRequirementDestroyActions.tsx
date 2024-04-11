import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/programRequirement/list/programRequirementListActions';
import Message from 'src/view/shared/message';
import programListActions from 'src/modules/program/list/programListActions';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';

const prefix = 'PROGRAMREQUIREMENT_DESTROY';

const programRequirementDestroyActions = {
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
          type: programRequirementDestroyActions.DESTROY_STARTED,
        });

        await ProgramRequirementService.destroyAll([id]);

        dispatch({
          type: programRequirementDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n(
            'entities.programRequirement.destroy.success',
          ),
        );

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(programListActions.doFetchCurrentFilter());

        if (redirect) {
          getHistory().push('/program-requirement');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(programListActions.doFetchCurrentFilter());

        dispatch({
          type: programRequirementDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll:
    (ids, redirect = true) =>
    async (dispatch) => {
      try {
        dispatch({
          type: programRequirementDestroyActions.DESTROY_ALL_STARTED,
        });

        await ProgramRequirementService.destroyAll(ids);

        dispatch({
          type: programRequirementDestroyActions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doClearAllSelected());
          dispatch(listActions.doFetchCurrentFilter());
        }
        dispatch(programListActions.doFetchCurrentFilter());

        Message.success(
          i18n(
            'entities.programRequirement.destroyAll.success',
          ),
        );

        if (redirect) {
          getHistory().push('/program-requirement');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());
        dispatch(programListActions.doFetchCurrentFilter());

        dispatch({
          type: programRequirementDestroyActions.DESTROY_ALL_ERROR,
        });
      }
    },
};

export default programRequirementDestroyActions;
