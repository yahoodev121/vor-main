import LazyLoad from 'react-lazy-load';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const StepContent = ({
  children,
  title,
  visible = false,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <LazyLoad>
      <MDBox>
        <MDBox lineHeight={0}>
          <MDTypography variant="h5">{title}</MDTypography>
        </MDBox>
        <MDBox mt={1.3}>{children}</MDBox>
      </MDBox>
    </LazyLoad>
  );
};

export default StepContent;
