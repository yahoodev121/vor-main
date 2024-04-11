import { createSelector } from 'reselect';

const selectRaw = (state) => state.client.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const clientDestroySelectors = {
  selectLoading,
};

export default clientDestroySelectors;
