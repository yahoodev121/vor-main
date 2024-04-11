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

const checkbox: Types = {
  styleOverrides: {
    root: {
      '& .MuiSvgIcon-root': {
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: pxToRem(16),
        height: pxToRem(16),
        color: transparent.main,
        border: `${borderWidth[1]} solid ${borderColor['original']}`,
        borderRadius: pxToRem(4),
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
          backgroundColor: primary.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            primary.main,
            primary.main,
          )}`,
          borderColor: primary.main,
        },
      },
    },

    colorSecondary: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: secondary.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: secondary.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            secondary.main,
            secondary.main,
          )}`,
          borderColor: secondary.main,
        },
      },
    },

    colorInfo: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: info.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: info.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            info.main,
            info.main,
          )}`,
          borderColor: info.main,
        },
      },
    },

    colorSuccess: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: success.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: success.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            success.main,
            success.main,
          )}`,
          borderColor: success.main,
        },
      },
    },

    colorWarning: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: warning.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: warning.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            warning.main,
            warning.main,
          )}`,
          borderColor: warning.main,
        },
      },
    },

    colorError: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: error.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: error.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            error.main,
            error.main,
          )}`,
          borderColor: error.main,
        },
      },
    },

    colorPurple: {
      color: borderColor['original'],

      '&.Mui-checked': {
        color: purple.main,

        '& .MuiSvgIcon-root': {
          backgroundColor: purple.main,
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='cap' stroke-linejoin='cap' stroke-width='3' d='M3 9l5 5l10-10'/%3e%3c/svg%3e"), ${linearGradient(
            purple.main,
            purple.main,
          )}`,
          borderColor: purple.main,
        },
      },
    },
  },
};

export default checkbox;
