import { createSelector } from 'reselect';

const selectRaw = (state) => state.highlight.quick;

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectHighlights = createSelector(
  [selectRaw],
  (raw) => raw.highlights?.rows,
);

const selectHasHighlights = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.highlights?.count),
);

const highlightQuickSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectHighlights,
  selectHasHighlights,
  selectRaw,
};

export default highlightQuickSelectors;
