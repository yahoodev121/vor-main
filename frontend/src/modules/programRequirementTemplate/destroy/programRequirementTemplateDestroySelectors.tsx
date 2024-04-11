import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirementTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementTemplateDestroySelectors = {
  selectLoading,
};

export default programRequirementTemplateDestroySelectors;
