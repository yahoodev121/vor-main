import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Card from '@mui/material/Card';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import Divider from '@mui/material/Divider';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';

const Authentication = (props): JSX.Element => {
  const { id } = props;

  const { sidenavColor } = selectMuiSettings();

  return (
    <Card id={id} sx={{ overflow: 'visible' }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2.4}
        topBorder
      >
        <MDTypography variant="h5">
          {i18n('profile.titles.twoFactorAuthentication')}
        </MDTypography>
        <ColorBadge color="success" label="enabled" />
      </MDBox>
      <MDBox p={2.4}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
          >
            Security keys
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <MDBox
              mx={{ xs: 0, sm: 1.6 }}
              mb={{ xs: 0.8, sm: 0 }}
            >
              <MDTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                No Security keys
              </MDTypography>
            </MDBox>
            <MDButton
              variant="outlined"
              color={sidenavColor}
              size="small"
            >
              add
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
          >
            SMS number
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <MDBox
              mx={{ xs: 0, sm: 1.6 }}
              mb={{ xs: 0.8, sm: 0 }}
            >
              <MDTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                +3012374423
              </MDTypography>
            </MDBox>
            <MDButton
              variant="outlined"
              color={sidenavColor}
              size="small"
            >
              edit
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
          >
            Authenticator app
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <MDBox
              mx={{ xs: 0, sm: 1.6 }}
              mb={{ xs: 0.8, sm: 0 }}
            >
              <MDTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Not Configured
              </MDTypography>
            </MDBox>
            <MDButton
              variant="outlined"
              color={sidenavColor}
              size="small"
            >
              set up
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
};

export default Authentication;
