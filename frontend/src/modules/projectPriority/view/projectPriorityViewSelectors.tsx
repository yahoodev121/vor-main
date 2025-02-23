import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectPriority.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectPriorityViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default projectPriorityViewSelectors;
