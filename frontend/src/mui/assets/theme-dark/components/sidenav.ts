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
import colors from 'src/mui/assets/theme-dark/base/colors';
import borders from 'src/mui/assets/theme-dark/base/borders';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';

const { background } = colors;
const { borderRadius } = borders;

// types
type Types = any;

const sidenav: Types = {
  styleOverrides: {
    root: {
      width: pxToRem(200),
      whiteSpace: 'nowrap',
      border: 'none',
    },

    paper: {
      width: pxToRem(200),
      backgroundColor: background.sidenav,
      //height: `calc(100vh - ${pxToRem(15.36)})`,
      //margin: pxToRem(7.68),
      //borderRadius: borderRadius.xl,
      border: 'none',
    },

    paperAnchorDockedLeft: {
      borderRight: 'none',
    },
  },
};

export default sidenav;
