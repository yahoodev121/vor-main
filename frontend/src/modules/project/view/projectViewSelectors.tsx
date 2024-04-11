import { createSelector } from 'reselect';

const selectRaw = (state) => state.project.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default projectViewSelectors;
