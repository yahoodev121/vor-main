import { createSelector } from 'reselect';

const selectRaw = (state) => state.project.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const projectDestroySelectors = {
  selectLoading,
};

export default projectDestroySelectors;
