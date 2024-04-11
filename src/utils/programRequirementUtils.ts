import { summarizeControl } from './programControlUtils';

export interface ITotalControlHealth {
  healthy: number;
  atRisk: number;
  nonCompliance: number;
}

export const emptyTotalControlHealth: ITotalControlHealth =
  {
    healthy: 0,
    atRisk: 0,
    nonCompliance: 0,
  };

/**
 * Summarizing control health.
 *
 * This function is designed for Array.reduce
 *
 * @returns total control health
 */
export const summarizeControlHealth = (
  total: ITotalControlHealth,
  { totalTaskHealth },
): ITotalControlHealth => ({
  healthy:
    (total.healthy ?? 0) + (totalTaskHealth.completed ?? 0),
  atRisk:
    (total.atRisk ?? 0) + (totalTaskHealth.overdue ?? 0),
  nonCompliance:
    (total.nonCompliance ?? 0) +
    (totalTaskHealth.failed ?? 0),
});

export const summarizeRequirement = ({
  controls,
  ...rest
}): any => {
  const newControls = controls?.map(summarizeControl) ?? [];

  return {
    ...rest,
    controls: newControls,
    totalControls: newControls.length,
    totalControlHealth:
      newControls.reduce(summarizeControlHealth, {
        ...emptyTotalControlHealth,
      }) ?? emptyTotalControlHealth,
  };
};
