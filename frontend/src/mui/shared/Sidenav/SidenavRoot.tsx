/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Drawer from '@mui/material/Drawer';
import { styled, Theme } from '@mui/material/styles';

export default styled(Drawer)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme | any;
    ownerState: any;
  }) => {
    const {
      palette,
      boxShadows,
      transitions,
      breakpoints,
      functions,
    } = theme;
    const {
      transparentSidenav,
      whiteSidenav,
      miniSidenav,
      miniSettingnav,
      darkMode,
    } = ownerState;

    const sidebarWidth = 200;
    const { transparent, gradients, white, background } =
      palette;
    const { xxl } = boxShadows;
    const { pxToRem, linearGradient } = functions;

    const darkBackground = darkMode
      ? background.sidenav
      : linearGradient(
          gradients.dark.state,
          gradients.dark.main,
        );

    let backgroundValue = darkBackground;

    if (transparentSidenav) {
      backgroundValue = transparent.main;
    } else if (whiteSidenav) {
      backgroundValue = white.main;
    }

    // styles for the sidenav when miniSidenav={false}
    const drawerOpenStyles = () => ({
      transform: 'translateX(0)',
      transition: transitions.create('transform', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up('xs')]: {
        background: whiteSidenav
          ? backgroundValue
          : darkBackground,
      },

      [breakpoints.up('xl')]: {
        background: backgroundValue,
        boxShadow: transparentSidenav ? 'none' : xxl,
        marginBottom: transparentSidenav ? 0 : 'inherit',
        left: '0',
        width: sidebarWidth,
        transform: 'translateX(0)',
        transition: transitions.create(
          ['width', 'background-color'],
          {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen,
          },
        ),
      },
    });

    // styles for the sidenav when miniSidenav={true}
    const drawerSideCloseStyles = () => ({
      transform: `translateX(${pxToRem(-320)})`,
      transition: transitions.create('transform', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up('xs')]: {
        background: whiteSidenav
          ? backgroundValue
          : darkBackground,
      },

      [breakpoints.up('xl')]: {
        background: backgroundValue,
        boxShadow: transparentSidenav ? 'none' : xxl,
        marginBottom: transparentSidenav ? 0 : 'inherit',
        left: '0',
        width: pxToRem(76.8),
        overflowX: 'hidden',
        transform: 'translateX(0)',
        transition: transitions.create(
          ['width', 'background-color'],
          {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          },
        ),
      },
    });

    // styles for the sidenav when miniSidenav={true}
    const drawerSettingOpenStyles = () => ({
      // transform: `translateX(${pxToRem(-320)})`,
      width: pxToRem(276.8),
      transition: transitions.create('transform', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up('xs')]: {
        background: whiteSidenav
          ? backgroundValue
          : darkBackground,
      },

      [breakpoints.up('xl')]: {
        background: backgroundValue,
        boxShadow: transparentSidenav ? 'none' : xxl,
        marginBottom: transparentSidenav ? 0 : 'inherit',
        left: '0',
        width: pxToRem(276.8),
        overflowX: 'hidden',
        transform: 'translateX(0)',
        transition: transitions.create(
          ['width', 'background-color'],
          {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          },
        ),
      },
    });

    return {
      '& .MuiDrawer-paper': {
        boxShadow: xxl,
        border: 'none',
        display: 'flex',
        flexDirection: 'row',

        ...( !miniSettingnav ?
          drawerSettingOpenStyles (): // setting oepn, side close
          miniSidenav                
          ? drawerSideCloseStyles()   // setting close, side close
          : drawerOpenStyles()),      // setting close, side open
      },
    };
  },
);
