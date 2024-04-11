import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectStatus.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectStatusDestroySelectors = {
  selectLoading,
};

export default projectStatusDestroySelectors;
