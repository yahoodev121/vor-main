import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirementTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programRequirementTemplateViewSelectors;
