import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaignInstance.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const campaignInstanceViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default campaignInstanceViewSelectors;
