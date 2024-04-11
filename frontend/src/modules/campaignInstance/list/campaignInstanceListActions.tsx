import CampaignInstanceService from 'src/modules/campaignInstance/campaignInstanceService';
import Errors from 'src/modules/shared/error/errors';
import selectors from 'src/modules/campaignInstance/list/campaignInstanceListSelectors';

const prefix = 'CAMPAIGNINSTANCE_LIST';

const campaignInstanceListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doClearAllSelected() {
    return {
      type: campaignInstanceListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: campaignInstanceListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: campaignInstanceListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: (additionalFilter) => async (dispatch) => {
    dispatch({
      type: campaignInstanceListActions.RESETED,
    });

    dispatch(
      campaignInstanceListActions.doFetch(
        additionalFilter,
        additionalFilter,
        false,
      ),
    );
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: campaignInstanceListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        campaignInstanceListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: campaignInstanceListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(
      campaignInstanceListActions.doFetchCurrentFilter(),
    );
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        campaignInstanceListActions.doFetch(
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
          type: campaignInstanceListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await CampaignInstanceService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: campaignInstanceListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: campaignInstanceListActions.FETCH_ERROR,
        });
      }
    },
};

export default campaignInstanceListActions;
