import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';

function CustomViewItem(props) {
  const { hiddenLabel, label, render, value } = props;
  const { darkMode } = selectMuiSettings();

  const isBlank =
    (!value && value !== 0 && value !== false) ||
    (Array.isArray(value) && !value.length);

  if (isBlank) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={hiddenLabel || !Boolean(label) ? 0 : 1.6}
      position="relative"
    >
      {!hiddenLabel && Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </MDTypography>
      )}
      {render && render(value)}
    </MDBox>
  );
}

CustomViewItem.defaultProps = {
  hiddenLabel: false,
};

CustomViewItem.propTypes = {
  hiddenLabel: PropTypes.bool,
  label: PropTypes.string,
  render: PropTypes.func,
  value: PropTypes.any,
};

export default CustomViewItem;
