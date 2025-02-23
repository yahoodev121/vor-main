import { createSelector } from 'reselect';

const selectRaw = (state) => state.programRequirement.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programRequirementViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default programRequirementViewSelectors;
