import MDBox from 'src/mui/components/MDBox';
import MDProgress from 'src/mui/components/MDProgress';
import MDTypography from 'src/mui/components/MDTypography';

const ProgressStatus = (props) => {
  const {
    color,
    completed,
    fullProgress,
    gap,
    justifyContent,
    textPadding,
    title,
    total,
    width,
  } = props;
  const progress = Math.round(
    (100 * (completed ?? 0)) / (total || 100),
  );
  return (
    <MDBox width={width}>
      <MDBox
        display="flex"
        justifyContent={justifyContent}
        gap={gap}
        px={textPadding}
      >
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="regular"
        >
          {title}
        </MDTypography>
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="regular"
        >
          {progress}%
        </MDTypography>
      </MDBox>
      <MDProgress
        color={color ?? 'success'}
        value={fullProgress ? 100 : progress}
      />
    </MDBox>
  );
};

ProgressStatus.defaultProps = {
  fullProgress: false,
  gap: 0,
  justifyContent: 'space-between',
  textPadding: 0,
  width: 'auto',
};

export default ProgressStatus;
