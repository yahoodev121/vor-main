import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function NoViewItem(props) {
  const { hiddenLabel, label, noData } = props;

  const { darkMode } = selectMuiSettings();

  return (
    <MDBox pt={hiddenLabel ? 0 : 1.6} position="relative">
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
      <MDTypography
        variant="button"
        fontWeight="regular"
        fontStyle="italic"
        textTransform="capitalize"
      >
        {noData ?? i18n('customViewer.noData', label)}
      </MDTypography>
    </MDBox>
  );
}

export default NoViewItem;
