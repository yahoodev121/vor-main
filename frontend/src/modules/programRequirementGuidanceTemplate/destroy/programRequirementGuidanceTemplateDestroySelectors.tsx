import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirementGuidanceTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementGuidanceTemplateDestroySelectors = {
  selectLoading,
};

export default programRequirementGuidanceTemplateDestroySelectors;
