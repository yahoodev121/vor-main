import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programControlTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programControlTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programControlTemplateViewSelectors;
