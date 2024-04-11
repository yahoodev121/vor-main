import { createSelector } from 'reselect';

const selectRaw = (state) => state.riskCategory.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const riskCategoryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default riskCategoryViewSelectors;
