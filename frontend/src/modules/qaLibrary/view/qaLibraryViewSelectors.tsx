import { createSelector } from 'reselect';

const selectRaw = (state) => state.qaLibrary.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const qaLibraryViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default qaLibraryViewSelectors;
