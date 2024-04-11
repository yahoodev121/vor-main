import { Card, Icon } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const IconCard = (props) => {
  const { sidenavColor } = selectMuiSettings();
  const { icon, iconBgColor, title, children } = props;
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.2rem"
          height="3.2rem"
          variant="gradient"
          bgColor={iconBgColor ?? sidenavColor}
          color="white"
          shadow="md"
          borderRadius="xl"
          flexShrink={0}
          ml={1.6}
          mt={-1.6}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDTypography
          variant="h5"
          sx={{ mt: 1.6, mb: 0.8, ml: 1.6 }}
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={1.6} height="100%">
        {children}
      </MDBox>
    </Card>
  );
};

export default IconCard;
