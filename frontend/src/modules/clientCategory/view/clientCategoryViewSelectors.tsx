import { createSelector } from 'reselect';

const selectRaw = (state) => state.clientCategory.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const clientCategoryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default clientCategoryViewSelectors;
