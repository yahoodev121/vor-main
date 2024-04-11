import { createSelector } from 'reselect';

const selectRaw = (state) => state.widget.tasksOnCalendar;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectTasks = createSelector(
  [selectRaw],
  (raw) => raw.tasks ?? [],
);

const selectTotalPages = createSelector(
  [selectRaw],
  (raw) => raw.totalPages ?? 1,
);

const selectFilter = createSelector(
  [selectRaw],
  (raw) => raw.filter,
);

const tasksOnCalendarSelectors = {
  selectRaw,
  selectLoading,
  selectTasks,
  selectTotalPages,
  selectFilter,
};

export default tasksOnCalendarSelectors;
