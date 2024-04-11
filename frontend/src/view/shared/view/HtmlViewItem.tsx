import { HtmlViewWrapper } from 'src/view/shared/view/HtmlView';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function HtmlViewItem(props) {
  const { hiddenLabel, value, label } = props;
  const { darkMode } = selectMuiSettings();
  if (!value) {
    return <NoViewItem {...props} />;
  }
  return (
    <MDBox
      pt={hiddenLabel || !Boolean(label) ? 0 : 1.6}
      position="relative"
    >
      {!hiddenLabel && (
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
      <HtmlViewWrapper>{parse(value)}</HtmlViewWrapper>
    </MDBox>
  );
}

HtmlViewItem.defaultProps = {
  hiddenLabel: false,
};

HtmlViewItem.propTypes = {
  hiddenLabel: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
};

export default HtmlViewItem;
