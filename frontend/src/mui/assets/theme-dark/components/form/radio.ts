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
import borders from 'src/mui/assets/theme-dark/base/borders';
import colors from 'src/mui/assets/theme-dark/base/colors';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';
import linearGradient from 'src/mui/assets/theme-dark/functions/linearGradient';

const { borderWidth, borderColor } = borders;
const {
  transparent,
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  purple,
} = colors;

// types
type Types = any;

const radio: Types = {
  styleOverrides: {
    root: {
      '& .MuiSvgIcon-root': {
        width: pxToRem(16),
        height: pxToRem(16),
        color: transparent.main,
        border: `${borderWidth[1]} solid ${borderColor['original']}`,
        borderRadius: '50%',
      },

      '&:after': {
        transition: 'opacity 250ms ease-in-out',
        content: `""`,
        position: 'absolute',
        width: pxToRem(12),
        height: pxToRem(12),
        borderRadius: '50%',
        opacity: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
      },

      '&:hover': {
        backgroundColor: transparent.main,
      },

      // '&.Mui-focusVisible': {
      //   border: `${borderWidth[2]} solid ${info.main} !important`,
      // },
    },

    colorPrimary: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: primary.main,

        '& .MuiSvgIcon-root': {
          borderColor: primary.main,
        },

        '&:after': {
          backgroundColor: primary.main,
          opacity: 1,
        },
      },
    },

    colorSecondary: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: secondary.main,

        '& .MuiSvgIcon-root': {
          borderColor: secondary.main,
        },

        '&:after': {
          backgroundColor: secondary.main,
          opacity: 1,
        },
      },
    },

    colorInfo: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: info.main,

        '& .MuiSvgIcon-root': {
          borderColor: info.main,
        },

        '&:after': {
          backgroundColor: info.main,
          opacity: 1,
        },
      },
    },

    colorSuccess: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: success.main,

        '& .MuiSvgIcon-root': {
          borderColor: success.main,
        },

        '&:after': {
          backgroundColor: success.main,
          opacity: 1,
        },
      },
    },

    colorWarning: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: warning.main,

        '& .MuiSvgIcon-root': {
          borderColor: warning.main,
        },

        '&:after': {
          backgroundColor: warning.main,
          opacity: 1,
        },
      },
    },

    colorError: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: error.main,

        '& .MuiSvgIcon-root': {
          borderColor: error.main,
        },

        '&:after': {
          backgroundColor: error.main,
          opacity: 1,
        },
      },
    },

    colorPurple: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: purple.main,

        '& .MuiSvgIcon-root': {
          borderColor: purple.main,
        },

        '&:after': {
          backgroundColor: purple.main,
          opacity: 1,
        },
      },
    },
  },
};

export default radio;
