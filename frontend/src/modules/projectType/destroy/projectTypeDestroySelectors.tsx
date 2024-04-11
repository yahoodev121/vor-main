import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectType.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectTypeDestroySelectors = {
  selectLoading,
};

export default projectTypeDestroySelectors;
