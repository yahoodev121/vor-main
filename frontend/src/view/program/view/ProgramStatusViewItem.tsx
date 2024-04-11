import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';
import programEnumerators from 'src/modules/program/programEnumerators';
import PropTypes from 'prop-types';

function ProgramStatusViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={programEnumerators.status}
      colors={programEnumerators.statusColor}
      i18nPrefix="entities.program.enumerators.status"
    />
  );
}

ProgramStatusViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ProgramStatusViewItem;
