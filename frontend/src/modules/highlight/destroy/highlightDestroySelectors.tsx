import { createSelector } from 'reselect';

const selectRaw = (state) => state.highlight.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const highlightDestroySelectors = {
  selectLoading,
};

export default highlightDestroySelectors;
