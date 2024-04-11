import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Theme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

const SideNavItem = ({
  darkMode,
  item: { id, icon, label },
}) => (
  <MDBox component="li" py={0.4}>
    <MDTypography
      component="a"
      href={`#${id}`}
      variant="button"
      fontWeight="regular"
      textTransform="capitalize"
      sx={({
        borders: { borderRadius },
        functions: { pxToRem },
        palette: { light },
        transitions,
      }: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        borderRadius: borderRadius.md,
        padding: `${pxToRem(8)} ${pxToRem(12.8)}`,
        transition: transitions.create('background-color', {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        }),

        '&:hover': {
          backgroundColor: light.main,
        },
      })}
    >
      <MDBox
        mr={1.2}
        lineHeight={0}
        color={darkMode ? 'white' : 'dark'}
      >
        <Icon fontSize="small">{icon}</Icon>
      </MDBox>
      {label}
    </MDTypography>
  </MDBox>
);

const SideNav = (props): JSX.Element => {
  const { items } = props;
  const { darkMode } = selectMuiSettings();

  if (!items || !items.length) {
    return null;
  }

  return (
    <Card>
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={1.6}
        m={0}
        sx={{ listStyle: 'none' }}
        topBorder
      >
        {(items ?? []).map((item, index) => (
          <SideNavItem
            key={`side-nav-item-${index}`}
            darkMode={darkMode}
            item={item}
          />
        ))}
      </MDBox>
    </Card>
  );
};

SideNav.propTypes = {
  items: PropTypes.array.isRequired,
};

export default SideNav;
