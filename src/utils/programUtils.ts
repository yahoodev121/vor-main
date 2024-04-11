import { ITotalControlHealth } from './programRequirementUtils';

export const ProgramStatusMap = {
  healthy: 'Healthy',
  atRisk: 'AtRisk',
  nonCompliance: 'NonCompliance',
  noTasks: 'NoTasks',
};

/**
 * Summarizing control health.
 *
 * This function is designed for Array.reduce
 *
 * @returns total control health
 */
export const summarizeRequirementHealth = (
  total: ITotalControlHealth,
  { totalControlHealth: current },
): ITotalControlHealth => ({
  healthy: (total.healthy ?? 0) + (current.healthy ?? 0),
  atRisk: (total.atRisk ?? 0) + (current.atRisk ?? 0),
  nonCompliance:
    (total.nonCompliance ?? 0) +
    (current.nonCompliance ?? 0),
});
