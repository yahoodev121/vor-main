import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Chip from '@mui/material/Chip';
import colors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import withStyles from '@mui/styles/withStyles';

const StyleChip = withStyles({
  root: {
    backgroundColor: colors.purple.main,
  },
})(Chip);

export default function FilterPreview(props) {
  const { sidenavColor, customSidenavColor } =
    selectMuiSettings();

  const { values, renders, onRemove } = props;

  const itemsNotEmpty = Object.keys(values || {})
    .map((key) => {
      if (!renders[key]) {
        return {
          value: null,
        };
      }

      return {
        key: key,
        label: renders[key].label,
        value: renders[key].render(values[key]),
      };
    })
    .filter(
      (item) =>
        item.value ||
        item.value === 0 ||
        item.value === false,
    );

  if (!itemsNotEmpty.length || props.expanded) {
    return (
      <MDTypography variant="h6" color="text">
        {i18n('common.filters')}
      </MDTypography>
    );
  }

  return (
    <MDBox display="flex" alignItems="center" gap={0.8}>
      <MDTypography variant="h6" color="text">
        {i18n('common.filters')}:
      </MDTypography>
      <MDBox
        display="flex"
        alignItems="center"
        flexGrow={1}
        flexWrap="wrap"
        gap={0.8}
      >
        {itemsNotEmpty.map((item) => {
          const props = {
            key: item.key,
            color: customSidenavColor
              ? 'default'
              : sidenavColor,
            label: `${item.label}: ${item.value}`,
            onDelete: onRemove
              ? () => onRemove(item.key)
              : undefined,
          };
          return customSidenavColor ? (
            <StyleChip {...props} size="small" />
          ) : (
            <Chip {...props} size="small" />
          );
        })}
      </MDBox>
    </MDBox>
  );
}
