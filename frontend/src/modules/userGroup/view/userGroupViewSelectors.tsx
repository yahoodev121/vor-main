import { createSelector } from 'reselect';

const selectRaw = (state) => state.userGroup.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const userGroupViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default userGroupViewSelectors;
