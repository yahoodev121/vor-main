import Errors from 'src/modules/shared/error/errors';
import PolicyService from 'src/modules/policy/policyService';
import selectors from 'src/modules/policy/versions/policyVersionsSelectors';
import { getHistory } from 'src/modules/store';
import policyViewActions from 'src/modules/policy/view/policyViewActions';

const prefix = 'POLICY_VERSIONS';

const policyVersionsActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: policyVersionsActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        policyVersionsActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: policyVersionsActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(policyVersionsActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const policy = selectors.selectPolicy(getState());
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        policyVersionsActions.doFetch(
          policy,
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (policy, filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: policyVersionsActions.FETCH_STARTED,
          payload: {
            policy,
            filter,
            rawFilter,
            keepPagination,
          },
        });

        const response = await PolicyService.versions(
          policy,
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: policyVersionsActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: policyVersionsActions.FETCH_ERROR,
        });
      }
    },

  doPublish:
    (policy, version) => async (dispatch, getState) => {
      try {
        const response = await PolicyService.publish(
          policy,
          version,
        );

        if (response) {
          dispatch(
            policyViewActions.doFind(policy, version),
          );
          dispatch(
            policyVersionsActions.doFetchCurrentFilter(),
          );
        }
      } catch (error) {
        Errors.handle(error);
      }
    },

  doClone:
    (policy, version) => async (dispatch, getState) => {
      try {
        const response = await PolicyService.clone(
          policy,
          version,
        );

        if (response.id && response.version) {
          getHistory().push(
            `/policy/${response.id}/${response.version}/edit`,
          );
        }
      } catch (error) {
        Errors.handle(error);
      }
    },
};

export default policyVersionsActions;
