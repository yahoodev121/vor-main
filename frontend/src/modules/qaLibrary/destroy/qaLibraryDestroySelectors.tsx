import { createSelector } from 'reselect';

const selectRaw = (state) => state.qaLibrary.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const qaLibraryDestroySelectors = {
  selectLoading,
};

export default qaLibraryDestroySelectors;
