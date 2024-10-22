import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectStatus.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectStatusViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default projectStatusViewSelectors;
