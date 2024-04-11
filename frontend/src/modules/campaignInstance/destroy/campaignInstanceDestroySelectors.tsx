import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaignInstance.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const campaignInstanceDestroySelectors = {
  selectLoading,
};

export default campaignInstanceDestroySelectors;
