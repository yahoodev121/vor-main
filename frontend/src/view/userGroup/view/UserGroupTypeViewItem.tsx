import PropTypes from 'prop-types';
import userGroupEnumerators from 'src/modules/userGroup/userGroupEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';

function UserGroupTypeViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={userGroupEnumerators.type}
      colors={userGroupEnumerators.typeColor}
      i18nPrefix="entities.userGroup.enumerators.type"
    />
  );
}

UserGroupTypeViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default UserGroupTypeViewItem;
