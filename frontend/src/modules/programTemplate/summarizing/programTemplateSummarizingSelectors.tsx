import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programTemplate.summarizing;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const programTemplateSummarizingSelectors = {
  selectRaw,
  selectLoading,
};

export default programTemplateSummarizingSelectors;
