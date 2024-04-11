import PropTypes from 'prop-types';
import clientEnumerators from 'src/modules/client/clientEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function ClientRatingViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={clientEnumerators.rating}
      colors={clientEnumerators.ratingColor}
      i18nPrefix="entities.client.enumerators.rating"
    />
  );
}

ClientRatingViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ClientRatingViewItem;
