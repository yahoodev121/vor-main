import { createSelector } from 'reselect';

const selectRaw = (state) => state.user.form;

const selectUser = createSelector(
  [selectRaw],
  (raw) => raw.user,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectDestroyLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.destroyLoading),
);

const userFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectDestroyLoading,
  selectUser,
  selectRaw,
};

export default userFormSelectors;
