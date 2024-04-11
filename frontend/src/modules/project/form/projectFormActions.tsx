import ProjectService from 'src/modules/project/projectService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROJECT_FORM';

const projectFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: projectFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProjectService.find(id);
      }

      dispatch({
        type: projectFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectFormActions.INIT_ERROR,
      });

      getHistory().push('/project');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: projectFormActions.CREATE_STARTED,
      });

      await ProjectService.create(values);

      dispatch({
        type: projectFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.project.create.success'),
      );

      getHistory().push('/project');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: projectFormActions.UPDATE_STARTED,
      });

      await ProjectService.update(id, values);

      dispatch({
        type: projectFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.project.update.success'),
      );

      getHistory().push('/project');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectFormActions.UPDATE_ERROR,
      });
    }
  },

  doAddTaskOrRisk: (id, values) => async (dispatch) => {
    try {
      dispatch({
        type: projectFormActions.UPDATE_STARTED,
      });

      await ProjectService.addTaskOrRisk(id, values);

      dispatch({
        type: projectFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.project.update.success'),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default projectFormActions;
