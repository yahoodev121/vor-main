import { createSelector } from 'reselect';

const selectRaw = (state) => state.user.role;

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectSummary = createSelector(
  [selectRaw],
  (raw) => raw.summary ?? {},
);

const selectSummaryLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.summaryLoading),
);

const selectUsersLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.usersLoading),
);

const selectUsers = createSelector(
  [selectRaw],
  (raw) => raw.users,
);

const userRoleSelectors = {
  selectRaw,
  selectSaveLoading,
  selectSummary,
  selectSummaryLoading,
  selectUsersLoading,
  selectUsers,
};

export default userRoleSelectors;
