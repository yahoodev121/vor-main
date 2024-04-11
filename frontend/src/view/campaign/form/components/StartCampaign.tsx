import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import IconCard from 'src/view/shared/components/IconCard';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';

const CampaignItem = (props) => {
  const { sidenavColor } = selectMuiSettings();

  const { icon, iconBgColor, title, description, onStart } =
    props;

  return (
    <Grid item md={6} xs={12}>
      <IconCard
        icon={icon}
        iconBgColor={iconBgColor || 'dark'}
        title={title}
      >
        <MDBox
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <MDTypography
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            {description}
          </MDTypography>
          <MDBox
            flexGrow={1}
            py={0.8}
            display="flex"
            justifyContent="center"
            alignItems="end"
          >
            <MDButton
              variant="contained"
              color={sidenavColor}
              onClick={() => onStart && onStart()}
            >
              {i18n('common.start')}
            </MDButton>
          </MDBox>
        </MDBox>
      </IconCard>
    </Grid>
  );
};

const StartCampaign = (props) => {
  const { onSelect } = props;

  const campaigns = [
    {
      icon: 'question_answer',
      title: 'Vendor Questionnaire',
      description: i18n(
        'entities.campaign.placeholders.vendorQuestionnaire',
      ),
      onStart: () => {
        onSelect &&
          onSelect({
            audience: 'Vendors',
            type: 'Questionnaire',
          });
      },
    },
    {
      icon: 'mail_outlined',
      title: 'Vendor Email',
      description: i18n(
        'entities.campaign.placeholders.vendorEmail',
      ),
      onStart: () => {
        onSelect &&
          onSelect({
            audience: 'Vendors',
            type: 'Email',
          });
      },
    },
    {
      icon: 'question_answer',
      title: 'Client Questionnaire',
      description: i18n(
        'entities.campaign.placeholders.clientQuestionnaire',
      ),
      onStart: () => {
        onSelect &&
          onSelect({
            audience: 'Clients',
            type: 'Questionnaire',
          });
      },
    },
    {
      icon: 'mail_outlined',
      title: 'Client Email',
      description: i18n(
        'entities.campaign.placeholders.clientEmail',
      ),
      onStart: () => {
        onSelect &&
          onSelect({
            audience: 'Clients',
            type: 'Email',
          });
      },
    },
  ];

  return (
    <MDBox p={1.6}>
      <Grid container spacing={3.2}>
        {campaigns.map((campaign, idx) => (
          <CampaignItem
            key={`campaign-${idx}`}
            {...campaign}
          />
        ))}
      </Grid>
    </MDBox>
  );
};

export default StartCampaign;
