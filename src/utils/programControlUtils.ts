import moment from 'moment';

export interface ITotalTaskHealth {
  completed: number;
  overdue: number;
  failed: number;
}

export const emptyTotalTaskHealth: ITotalTaskHealth = {
  completed: 0,
  overdue: 0,
  failed: 0,
};

const limitOverdue = 3;

/**
 * Summarizing task health.
 *
 * This function is designed for Array.reduce
 *
 * @returns total task health
 */
export const summarizeTaskHealth = (
  total: ITotalTaskHealth,
  { status, ...task },
): ITotalTaskHealth => {
  const completedDate = moment(task.completedDate);
  const dueDate = moment(task.dueDate);
  const diffDays = completedDate.diff(dueDate, 'days');
  const now = moment();
  const isFuture = dueDate.isAfter(now);

  return {
    completed:
      (total.completed ?? 0) +
      (!isFuture &&
      completedDate.isSameOrBefore(dueDate) &&
      status === 'Complete'
        ? 1
        : 0),
    overdue:
      (total.overdue ?? 0) +
      (!isFuture &&
      completedDate.isAfter(dueDate) &&
      diffDays <= limitOverdue &&
      status === 'Complete'
        ? 1
        : 0),
    failed:
      (total.failed ?? 0) +
      ((!isFuture && !task.completedDate) ||
      diffDays > limitOverdue
        ? 1
        : 0),
  };
};

export const summarizeControl = ({
  tasks,
  requirements,
  ...rest
}): any => ({
  ...rest,
  tasks,
  requirements,
  totalRecurringTasks:
    tasks?.filter(({ repeat }) => repeat !== 'Never')
      ?.length ?? 0,
  totalOneTimeTasks:
    tasks?.filter(({ repeat }) => repeat === 'Never')
      ?.length ?? 0,
  totalTaskHealth:
    tasks?.reduce(summarizeTaskHealth, {
      ...emptyTotalTaskHealth,
    }) ?? emptyTotalTaskHealth,
  requirementIDs: requirements?.map(
    (item) => item?.requirementID,
  ),
  requirementNames: requirements?.map((item) => item?.name),
});
