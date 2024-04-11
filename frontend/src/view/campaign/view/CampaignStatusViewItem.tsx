import campaignEnumerators from 'src/modules/campaign/campaignEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';
import PropTypes from 'prop-types';

function CampaignStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={campaignEnumerators.status}
      colors={campaignEnumerators.statusColor}
      i18nPrefix="entities.campaign.enumerators.status"
    />
  );
}

CampaignStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default CampaignStatusViewItem;
