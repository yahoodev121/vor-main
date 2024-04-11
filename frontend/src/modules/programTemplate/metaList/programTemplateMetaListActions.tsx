import Errors from 'src/modules/shared/error/errors';
import ProgramTemplateService from 'src/modules/programTemplate/programTemplateService';

const prefix = 'PROGRAMTEMPLATE_META_LIST';

const programTemplateMetaListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: programTemplateMetaListActions.FETCH_STARTED,
      });

      const response =
        await ProgramTemplateService.metaList();

      dispatch({
        type: programTemplateMetaListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programTemplateMetaListActions.FETCH_ERROR,
      });
    }
  },
};

export default programTemplateMetaListActions;
