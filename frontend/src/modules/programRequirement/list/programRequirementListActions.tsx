import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import exporterFields from 'src/modules/programRequirement/list/programRequirementListExporterFields';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';
import selectors from 'src/modules/programRequirement/list/programRequirementListSelectors';

const prefix = 'PROGRAMREQUIREMENT_LIST';

const programRequirementListActions = {
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
      type: programRequirementListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: programRequirementListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: programRequirementListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: (additionalFilters) => async (dispatch) => {
    dispatch({
      type: programRequirementListActions.RESETED,
    });

    dispatch(
      programRequirementListActions.doFetch(
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
        type: programRequirementListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await ProgramRequirementService.list(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n(
          'entities.programRequirement.exporterFileName',
        ),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: programRequirementListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: programRequirementListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: programRequirementListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        programRequirementListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: programRequirementListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      programRequirementListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        programRequirementListActions.doFetch(
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
            type: programRequirementListActions.FETCH_STARTED,
            payload: { filter, rawFilter, keepPagination },
          });

          const response =
            await ProgramRequirementService.list(
              filter,
              selectors.selectOrderBy(getState()),
              selectors.selectLimit(getState()),
              selectors.selectOffset(getState()),
            );

          dispatch({
            type: programRequirementListActions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error);

          dispatch({
            type: programRequirementListActions.FETCH_ERROR,
          });
        }
      },
};

export default programRequirementListActions;
