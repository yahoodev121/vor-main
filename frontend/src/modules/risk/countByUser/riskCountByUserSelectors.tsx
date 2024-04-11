import { createSelector } from 'reselect';

const selectRaw = (state) => state.risk.countByUser;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const riskCountByUserSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default riskCountByUserSelectors;
