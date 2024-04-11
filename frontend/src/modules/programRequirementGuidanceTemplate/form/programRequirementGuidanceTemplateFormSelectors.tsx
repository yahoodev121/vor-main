import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirementGuidanceTemplate.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const programRequirementGuidanceTemplateFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectRaw,
};

export default programRequirementGuidanceTemplateFormSelectors;
