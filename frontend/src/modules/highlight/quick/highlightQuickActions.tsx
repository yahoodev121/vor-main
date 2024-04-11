import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { v4 as uuid } from 'uuid';
import Errors from 'src/modules/shared/error/errors';
import highlightListActions from 'src/modules/highlight/list/highlightListActions';
import HighlightService from 'src/modules/highlight/highlightService';
import Message from 'src/view/shared/message';

const prefix = 'HIGHLIGHT_FORM';

const highlightQuickActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  NEW_QUICK_HIGHLIGHT: `${prefix}_NEW_QUICK_HIGHLIGHT`,

  DELETE_QUICK_HIGHLIGHT: `${prefix}_DELETE_QUICK_HIGHLIGHT`,

  QUICK_STARTED: `${prefix}_QUICK_STARTED`,
  QUICK_SUCCESS: `${prefix}_QUICK_SUCCESS`,
  QUICK_ERROR: `${prefix}_QUICK_ERROR`,

  doInit: (fileId) => async (dispatch) => {
    try {
      dispatch({
        type: highlightQuickActions.INIT_STARTED,
      });

      const highlights = await HighlightService.findByFile(
        fileId,
      );

      dispatch({
        type: highlightQuickActions.INIT_SUCCESS,
        payload: highlights,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: highlightQuickActions.INIT_ERROR,
      });

      getHistory().push('/highlight');
    }
  },

  doQuick: (fileId, highlights) => async (dispatch) => {
    try {
      dispatch({
        type: highlightQuickActions.QUICK_STARTED,
      });

      await HighlightService.quick(fileId, highlights);

      dispatch({
        type: highlightQuickActions.QUICK_SUCCESS,
      });

      dispatch(highlightQuickActions.doInit(fileId));

      dispatch(highlightListActions.doFetchCurrentFilter());

      Message.success(
        i18n('entities.highlight.create.success'),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: highlightQuickActions.QUICK_ERROR,
      });
    }
  },

  doNewQuickHighlight:
    (description, annotations) => async (dispatch) => {
      dispatch({
        type: highlightQuickActions.NEW_QUICK_HIGHLIGHT,
        payload: {
          title: '',
          description,
          tags: [],
          tempId: uuid(),
          annotations,
        },
      });
    },

  doDeleteQuickHighlight: (index) => async (dispatch) => {
    dispatch({
      type: highlightQuickActions.DELETE_QUICK_HIGHLIGHT,
      payload: index,
    });
  },
};

export default highlightQuickActions;
