import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SideNav from 'src/view/auth/profile/SideNav';
import slug from 'slug';
import SettingsFormPage from 'src/view/settings/settingsForm/SettingsFormPage';
import AthenaFormPage from 'src/view/settings/athenaForm/AthenaFormPage';

const sideNavItems = () =>
  [
    {
      id: slug('settings'),
      icon: 'settings',
      label: i18n('settings.sideNavItems.settings'),
      Component: SettingsFormPage,
    },
    {
      id: slug('athena'),
      icon: 'psychology_alt',
      label: i18n('settings.sideNavItems.athena'),
      Component: AthenaFormPage,
    },
  ].filter(Boolean);

const SettingsPage = (props) => {

  const { fixedNavbar } = selectMuiSettings();

  const navItems = sideNavItems();

  return (
    <>
      <MDBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2.4}
      >
        <MDTypography variant="h3">
          {i18n('settings.title')}
        </MDTypography>
        <MDBox />
      </MDBox>
      <Grid container spacing={1.6}>
        <Grid item xs={12} lg={3}>
          <MDBox
            position="sticky"
            top={fixedNavbar ? '70px' : 0}
          >
            <Grid container spacing={1.6}>
              <Grid item xs={12}>
                <SideNav items={navItems} />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Grid container spacing={1.6}>
            {navItems
              .filter(({ Component }) => !!Component)
              .map(({ id, Component }, index) => (
                <Grid
                  key={`settings-section-${index}`}
                  xs={12}
                  item
                >
                  <Component
                    id={id}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SettingsPage;
