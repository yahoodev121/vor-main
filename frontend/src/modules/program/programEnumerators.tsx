import colors from 'src/mui/assets/theme/base/colors';

const programEnumerators = {
  status: ['Healthy', 'AtRisk', 'NonCompliance', 'NoTasks'],
  statusColor: [
    colors.success.main,
    colors.warning.main,
    colors.error.main,
    colors.dark.main,
  ],
};

export default programEnumerators;
