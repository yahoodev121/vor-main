import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import ProgramControlService from 'src/modules/programControl/programControlService';
import selectors from 'src/modules/programControl/listView/programControlListViewSelectors';

const prefix = 'PROGRAMCONTROL_LISTVIEW';

const programControlListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doReset: (additionalFilters) => async (dispatch) => {
    dispatch({
      type: programControlListActions.RESETED,
    });

    dispatch(
      programControlListActions.doFetch(
        additionalFilters,
        additionalFilters,
        false,
      ),
    );
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: programControlListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        programControlListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: programControlListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      programControlListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        programControlListActions.doFetch(
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
          type: programControlListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await ProgramControlService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: programControlListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: programControlListActions.FETCH_ERROR,
        });
      }
    },
};

export default programControlListActions;
