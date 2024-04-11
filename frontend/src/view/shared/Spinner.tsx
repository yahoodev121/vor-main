import { CircularProgress } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';

interface SpinnerProps {
  noMargin?: boolean;
  overlap?: boolean;
  size?: number;
  style?: object;
}

function Spinner({
  noMargin,
  overlap,
  size,
  style,
}: SpinnerProps) {
  const { sidenavColor } = selectMuiSettings();
  const renderSpinner = () => (
    <div
      style={{
        width: '100%',
        marginTop: noMargin ? 0 : size / 2,
        marginBottom: noMargin ? 0 : size / 2,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        lineHeight: 0,
        ...style,
      }}
    >
      <CircularProgress color={sidenavColor} size={size} />
    </div>
  );
  return overlap ? (
    <MDBox
      display="flex"
      position="absolute"
      left="0"
      top="0"
      right="0"
      bottom="0"
      lineHeight={0}
    >
      {renderSpinner()}
    </MDBox>
  ) : (
    renderSpinner()
  );
}

Spinner.defaultProps = {
  noMargin: false,
  overlap: false,
  size: 40,
  style: {},
};

export default Spinner;
