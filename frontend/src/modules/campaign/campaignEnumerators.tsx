import colors from 'src/mui/assets/theme/base/colors';

const campaignEnumerators = {
  status: ['Not Started', 'In Progress', 'Completed'],
  statusColor: [
    colors.backlog.main,
    colors.inprogress.main,
    colors.success.main,
  ],
  type: ['Questionnaire', 'Email'],
  audience: ['Vendors', 'Clients'],
  emailClient: ['primary', 'infoSec', 'privacy'],
  emailClientColor: [
    colors.success.main,
    colors.inprogress.main,
    colors.dark.main,
  ],
  emailVendor: ['primary', 'support', 'infoSec', 'privacy'],
  emailVendorColor: [
    colors.success.main,
    colors.info.main,
    colors.inprogress.main,
    colors.dark.main,
  ],
};

export default campaignEnumerators;
