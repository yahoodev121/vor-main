import ProjectTypeService from 'src/modules/projectType/projectTypeService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROJECTTYPE_FORM';

const projectTypeFormActions = {
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
        type: projectTypeFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ProjectTypeService.find(id);
      }

      dispatch({
        type: projectTypeFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectTypeFormActions.INIT_ERROR,
      });

      getHistory().push('/project-type');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: projectTypeFormActions.CREATE_STARTED,
      });

      await ProjectTypeService.create(values);

      dispatch({
        type: projectTypeFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projectType.create.success'),
      );

      getHistory().push('/project-type');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectTypeFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: projectTypeFormActions.UPDATE_STARTED,
      });

      await ProjectTypeService.update(id, values);

      dispatch({
        type: projectTypeFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.projectType.update.success'),
      );

      getHistory().push('/project-type');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: projectTypeFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default projectTypeFormActions;
