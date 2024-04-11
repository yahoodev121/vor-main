import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import ProgramRequirementService from 'src/modules/programRequirement/programRequirementService';
import selectors from 'src/modules/programRequirement/listView/programRequirementListViewSelectors';

const prefix = 'PROGRAMREQUIREMENT_LISTVIEW';

const programRequirementListViewActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: (additionalFilters) => async (dispatch) => {
    dispatch({
      type: programRequirementListViewActions.RESETED,
    });

    dispatch(
      programRequirementListViewActions.doFetch(
        additionalFilters,
        additionalFilters,
        false,
      ),
    );
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: programRequirementListViewActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        programRequirementListViewActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: programRequirementListViewActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      programRequirementListViewActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        programRequirementListViewActions.doFetch(
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
          type: programRequirementListViewActions.FETCH_STARTED,
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
          type: programRequirementListViewActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: programRequirementListViewActions.FETCH_ERROR,
        });
      }
    },
};

export default programRequirementListViewActions;
