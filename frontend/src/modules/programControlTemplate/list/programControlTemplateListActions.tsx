import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import exporterFields from 'src/modules/programControlTemplate/list/programControlTemplateListExporterFields';
import ProgramControlTemplateService from 'src/modules/programControlTemplate/programControlTemplateService';
import selectors from 'src/modules/programControlTemplate/list/programControlTemplateListSelectors';

const prefix = 'PROGRAMCONTROLTEMPLATE_LIST';

const programControlTemplateListActions = {
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
      type: programControlTemplateListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: programControlTemplateListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: programControlTemplateListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: (additionalFilters) => async (dispatch) => {
    dispatch({
      type: programControlTemplateListActions.RESETED,
    });

    dispatch(
      programControlTemplateListActions.doFetch(
        additionalFilters,
        additionalFilters,
        false,
      ),
    );
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: programControlTemplateListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response =
        await ProgramControlTemplateService.list(
          { ...filter, export: 1 },
          selectors.selectOrderBy(getState()),
          null,
          null,
        );

      new Exporter(
        exporterFields,
        i18n(
          'entities.programControlTemplate.exporterFileName',
        ),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: programControlTemplateListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programControlTemplateListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: programControlTemplateListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        programControlTemplateListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: programControlTemplateListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      programControlTemplateListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        programControlTemplateListActions.doFetch(
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
          type: programControlTemplateListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response =
          await ProgramControlTemplateService.list(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

        dispatch({
          type: programControlTemplateListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: programControlTemplateListActions.FETCH_ERROR,
        });
      }
    },
};

export default programControlTemplateListActions;
