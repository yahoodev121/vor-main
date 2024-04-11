import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.programControlTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programControlTemplateDestroySelectors = {
  selectLoading,
};

export default programControlTemplateDestroySelectors;
