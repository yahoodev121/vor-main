import QuestionnaireTemplateService from 'src/modules/questionnaireTemplate/questionnaireTemplateService';
import selectors from 'src/modules/questionnaireTemplate/list/questionnaireTemplateListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/questionnaireTemplate/list/questionnaireTemplateListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'QUESTIONNAIRETEMPLATE_LIST';

const questionnaireTemplateListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: questionnaireTemplateListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: questionnaireTemplateListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: questionnaireTemplateListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: questionnaireTemplateListActions.RESETED,
    });

    dispatch(questionnaireTemplateListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: questionnaireTemplateListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response =
        await QuestionnaireTemplateService.list(
          { ...filter, export: 1 },
          selectors.selectOrderBy(getState()),
          null,
          null,
        );

      new Exporter(
        exporterFields,
        i18n(
          'entities.questionnaireTemplate.exporterFileName',
        ),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: questionnaireTemplateListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: questionnaireTemplateListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: questionnaireTemplateListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        questionnaireTemplateListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: questionnaireTemplateListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      questionnaireTemplateListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        questionnaireTemplateListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: questionnaireTemplateListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response =
          await QuestionnaireTemplateService.list(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

        dispatch({
          type: questionnaireTemplateListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: questionnaireTemplateListActions.FETCH_ERROR,
        });
      }
    },
};

export default questionnaireTemplateListActions;
