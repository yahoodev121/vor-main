import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Color from 'color';
import Colors from 'src/view/shared/theme/Colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

const parseColor = (color) => {
  let newColor = null;
  try {
    newColor = Color(color);
  } catch (e) {
    const themeColor = Colors(color);
    if (typeof themeColor !== 'string') {
      throw e;
    }
    newColor = Color(themeColor);
  }
  return newColor;
};

export const getColorBadgeFore = (color) => {
  if (!color) {
    return null;
  }
  return parseColor(color).mix(Color('black'), 0.3).hex();
};

export const getColorBadgeBack = (color) => {
  if (!color) {
    return null;
  }
  return parseColor(color).mix(Color('white'), 0.75).hex();
};

const ColorBadge = (props) => {
  const { sidenavColor } = selectMuiSettings();
  const {
    color,
    draggable,
    label,
    onClick,
    onDelete,
    onDragStart,
    isUppercase,
    isViewItem,
  } = props;
  const defaultColor = Colors(sidenavColor);
  const backColor = getColorBadgeBack(
    color || defaultColor,
  );
  const foreColor = getColorBadgeFore(
    color || defaultColor,
  );
  return (
    <MDBox
      display="inline-block"
      draggable={draggable}
      lineHeight={0}
      maxWidth="100%"
      onClick={onClick}
      onDragStart={onDragStart}
    >
      <MDBox
        alignItems="center"
        bgColor={backColor}
        borderRadius="md"
        color={foreColor}
        display="flex"
        flexWrap="nowrap"
        gap={0.4}
        m={0}
        maxWidth="100%"
        px={0.8}
        py={0.7}
      >
        <MDTypography
          flexGrow={1}
          textTransform={isUppercase ? 'uppercase' : null}
          fontWeight="bold"
          fontSize="9.6px"
          color="inherit"
          letterSpacing={0.8}
          lineHeight={1}
          variant="caption"
          whiteSpace={isViewItem ? 'default' : 'nowrap'}
          overflow="hidden"
          textOverflow="ellipsis"
          maxWidth={isViewItem ? 1400 : 240}
        >
          {label}
        </MDTypography>
        {Boolean(onDelete) && (
          <MDBox
            bgColor={foreColor}
            borderRadius="100%"
            color={backColor}
            fontSize="10px"
            height="10px"
            lineHeight={0}
            onClick={onDelete}
            width="10px"
            sx={{
              cursor: 'pointer',
            }}
          >
            <ClearSharpIcon />
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
};

ColorBadge.defaultProps = {
  draggable: false,
  isUppercase: true,
  isViewItem: false,
};

ColorBadge.propTypes = {
  color: PropTypes.string,
  draggable: PropTypes.bool,
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onDragStart: PropTypes.func,
  isUppercase: PropTypes.bool,
  isViewItem: PropTypes.bool,
};

export default ColorBadge;
