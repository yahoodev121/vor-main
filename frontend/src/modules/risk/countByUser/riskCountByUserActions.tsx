import { getHistory } from 'src/modules/store';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import RiskService from 'src/modules/risk/riskService';

const prefix = 'RISK_COUNT_BY_USER';

const riskCountByUserActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch:
    (id = null) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: riskCountByUserActions.FETCH_STARTED,
        });

        const currentUser = authSelectors.selectCurrentUser(
          getState(),
        );

        const record = await RiskService.countByUser(
          id ?? currentUser.id,
        );

        dispatch({
          type: riskCountByUserActions.FETCH_SUCCESS,
          payload: record,
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: riskCountByUserActions.FETCH_ERROR,
        });

        getHistory().push('/risk');
      }
    },
};

export default riskCountByUserActions;
