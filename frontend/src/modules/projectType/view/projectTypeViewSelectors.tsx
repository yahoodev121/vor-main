import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectType.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectTypeViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default projectTypeViewSelectors;
