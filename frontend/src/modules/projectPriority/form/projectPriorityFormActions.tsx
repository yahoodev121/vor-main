import ProjectPriorityService from 'src/modules/projectPriority/projectPriorityService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROJECTPRIORITY_FORM';

const projectPriorityFormActions = {
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
        type: projectPriorityFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProjectPriorityService.find(id);
      }

      dispatch({
        type: projectPriorityFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectPriorityFormActions.INIT_ERROR,
      });

      getHistory().push('/project-priority');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: projectPriorityFormActions.CREATE_STARTED,
      });

      await ProjectPriorityService.create(values);

      dispatch({
        type: projectPriorityFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projectPriority.create.success'),
      );

      getHistory().push('/project-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectPriorityFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: projectPriorityFormActions.UPDATE_STARTED,
      });

      await ProjectPriorityService.update(id, values);

      dispatch({
        type: projectPriorityFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projectPriority.update.success'),
      );

      getHistory().push('/project-priority');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectPriorityFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default projectPriorityFormActions;
