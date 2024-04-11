import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirementGuidanceTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementGuidanceTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programRequirementGuidanceTemplateViewSelectors;
