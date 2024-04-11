import { createSelector } from 'reselect';

const selectRaw = (state) => state.highlight.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const highlightViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default highlightViewSelectors;
