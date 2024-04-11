import { createSelector } from 'reselect';

const selectRaw = (state) => state.projectPriority.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectPriorityDestroySelectors = {
  selectLoading,
};

export default projectPriorityDestroySelectors;
