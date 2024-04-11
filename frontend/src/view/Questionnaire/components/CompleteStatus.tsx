import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDProgress from 'src/mui/components/MDProgress';
import MDTypography from 'src/mui/components/MDTypography';

const CompleteStatus = (props) => {
  const { total, completed } = props;
  const progress = Math.round(
    (100 * (completed ?? 0)) / (total || 1),
  );
  return (
    <MDBox>
      <MDBox display="flex" justifyContent="space-between">
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="regular"
        >
          {i18n(
            'entities.questionnaireTemplate.labels.completedOf',
            completed,
            total,
          )}
        </MDTypography>
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="regular"
        >
          {progress}%
        </MDTypography>
      </MDBox>
      <MDProgress color="success" value={progress} />
    </MDBox>
  );
};

export default CompleteStatus;
