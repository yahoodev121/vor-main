import { createSelector } from 'reselect';

const selectRaw = (state) => state.userGroup.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectToggleUsers = createSelector(
  [selectRaw],
  (raw) => raw.users,
);

const userGroupFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectRaw,
  selectToggleUsers,
};

export default userGroupFormSelectors;
