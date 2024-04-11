import { getHistory } from 'src/modules/store';
import Errors from 'src/modules/shared/error/errors';
import ProgramControlService from 'src/modules/programControl/programControlService';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';

const prefix = 'PROGRAMCONTROL_VIEW';

const programControlViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  ADD_TASKS_STARTED: `${prefix}_ADD_TASKS_STARTED`,
  ADD_TASKS_SUCCESS: `${prefix}_ADD_TASKS_SUCCESS`,
  ADD_TASKS_ERROR: `${prefix}_ADD_TASKS_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: programControlViewActions.FIND_STARTED,
      });

      const record = await ProgramControlService.find(id);

      dispatch({
        type: programControlViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlViewActions.FIND_ERROR,
      });

      getHistory().push('/program-control');
    }
  },

  doAddTasks: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: programControlViewActions.ADD_TASKS_STARTED,
      });

      const record = await ProgramControlService.addTasks(
        id,
        values,
      );

      dispatch({
        type: programControlViewActions.ADD_TASKS_SUCCESS,
        payload: record,
      });

      Message.success(
        i18n('entities.programControl.addTask.success'),
      );

      getHistory().push(`/program-control/${id}`);
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlViewActions.ADD_TASKS_ERROR,
      });
    }
  },
};

export default programControlViewActions;
