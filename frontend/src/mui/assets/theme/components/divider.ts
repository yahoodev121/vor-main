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

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';

// Material Dashboard 2 PRO React TS Helper Functions
import rgba from 'src/mui/assets/theme/functions/rgba';
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

const { dark, transparent, white } = colors;

// types
type Types = any;

const divider: Types = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(
        dark.main,
        0,
      )}, ${rgba(dark.main, 0.4)}, ${rgba(
        dark.main,
        0,
      )}) !important`,
      height: pxToRem(0.8),
      margin: `${pxToRem(12)} 0`,
      borderBottom: 'none',
      opacity: 0.25,
    },

    vertical: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to bottom, ${rgba(
        dark.main,
        0,
      )}, ${rgba(dark.main, 0.4)}, ${rgba(
        dark.main,
        0,
      )}) !important`,
      width: pxToRem(0.8),
      height: '100%',
      margin: `0 ${pxToRem(12)}`,
      borderRight: 'none',
    },

    light: {
      backgroundColor: transparent.main,
      backgroundImage: `linear-gradient(to right, ${rgba(
        white.main,
        0,
      )}, ${white.main}, ${rgba(
        white.main,
        0,
      )}) !important`,

      '&.MuiDivider-vertical': {
        backgroundImage: `linear-gradient(to bottom, ${rgba(
          white.main,
          0,
        )}, ${white.main}, ${rgba(
          white.main,
          0,
        )}) !important`,
      },
    },
  },
};

export default divider;
