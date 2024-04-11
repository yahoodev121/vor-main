import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaign.review;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const campaignReviewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default campaignReviewSelectors;
