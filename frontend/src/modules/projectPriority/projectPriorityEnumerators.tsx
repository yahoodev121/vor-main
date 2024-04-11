import colors from 'src/mui/assets/theme/base/colors';

const projectPriorityEnumerators = {
  priority: ['None', 'Low', 'Medium', 'High', 'Critical'],
  priorityColor: [
    colors.info.main,
    colors.low.main,
    colors.medium.main,
    colors.high.main,
    colors.critical.main,
  ],
};

export default projectPriorityEnumerators;
