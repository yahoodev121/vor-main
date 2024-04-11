import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaign.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const campaignDestroySelectors = {
  selectLoading,
};

export default campaignDestroySelectors;
