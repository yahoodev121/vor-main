import PropTypes from 'prop-types';
import userEnumerators from 'src/modules/user/userEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function UserStatusView(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={userEnumerators.status}
      colors={userEnumerators.statusColor}
      i18nPrefix="user.status"
    />
  );
}

UserStatusView.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default UserStatusView;
