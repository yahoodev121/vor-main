import { createSelector } from 'reselect';

const selectRaw = (state) => state.programControl.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programControlViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programControlViewSelectors;
