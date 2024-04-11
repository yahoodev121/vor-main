import { createSelector } from 'reselect';

const selectRaw = (state) => state.userGroup.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const userGroupDestroySelectors = {
  selectLoading,
};

export default userGroupDestroySelectors;
