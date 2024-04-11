import { createSelector } from 'reselect';

const selectRaw = (state) => state.program.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programViewSelectors;
