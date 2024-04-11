import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaign.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const campaignViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default campaignViewSelectors;
