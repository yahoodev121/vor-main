import colors from 'src/mui/assets/theme/base/colors';

const projectStatusEnumerators = {
  status: [
    'Not Started',
    'On Track',
    'At Risk',
    'Off Track',
    'On Hold',
    'Complete',
  ],
  statusColor: [
    colors.info.main,
    colors.lightGreen.main,
    colors.critical.main,
    colors.orange.main,
    colors.grey[800],
    colors.darkGreen.main,
  ],
};

export default projectStatusEnumerators;
