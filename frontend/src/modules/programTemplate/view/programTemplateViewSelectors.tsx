import { createSelector } from 'reselect';

const selectRaw = (state) => state.programTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programTemplateViewSelectors;
