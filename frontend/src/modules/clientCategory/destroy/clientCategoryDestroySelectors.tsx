import { createSelector } from 'reselect';

const selectRaw = (state) => state.clientCategory.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const clientCategoryDestroySelectors = {
  selectLoading,
};

export default clientCategoryDestroySelectors;
