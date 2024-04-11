import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programRequirement.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementDestroySelectors = {
  selectLoading,
};

export default programRequirementDestroySelectors;
