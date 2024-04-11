import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import HighlightService from 'src/modules/highlight/highlightService';
import Message from 'src/view/shared/message';

const prefix = 'HIGHLIGHT_FORM';

const highlightFormActions = {
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
        type: highlightFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await HighlightService.find(id);
      }

      dispatch({
        type: highlightFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: highlightFormActions.INIT_ERROR,
      });

      getHistory().push('/highlight');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: highlightFormActions.CREATE_STARTED,
      });

      await HighlightService.create(values);

      dispatch({
        type: highlightFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.highlight.create.success'),
      );

      getHistory().push('/highlight');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: highlightFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: highlightFormActions.UPDATE_STARTED,
      });

      await HighlightService.update(id, values);

      dispatch({
        type: highlightFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.highlight.update.success'),
      );

      getHistory().push('/highlight');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: highlightFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default highlightFormActions;
