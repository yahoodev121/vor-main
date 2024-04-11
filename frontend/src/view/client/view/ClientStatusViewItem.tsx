import PropTypes from 'prop-types';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function ClientStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={clientEnumerators.status}
      colors={clientEnumerators.statusColor}
      i18nPrefix="entities.client.enumerators.status"
    />
  );
}

ClientStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ClientStatusViewItem;
