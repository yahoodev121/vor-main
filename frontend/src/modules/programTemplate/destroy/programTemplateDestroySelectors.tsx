import { createSelector } from 'reselect';

const selectRaw = (state) => state.programTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programTemplateDestroySelectors = {
  selectLoading,
};

export default programTemplateDestroySelectors;
