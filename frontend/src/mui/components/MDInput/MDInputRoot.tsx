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
import TextField from '@mui/material/TextField';
import { styled, Theme } from '@mui/material/styles';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import lightColors from 'src/mui/assets/theme/base/colors';

export default styled(TextField)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: any;
  }) => {
    const { palette, functions } = theme;
    const { error, success, disabled } = ownerState;
    const { sidenavColor, darkMode } = selectMuiSettings();
    const color = darkMode
      ? darkColors[sidenavColor]?.main
      : lightColors[sidenavColor]?.main;

    const {
      grey,
      transparent,
      error: colorError,
      success: colorSuccess,
    } = palette;
    const { pxToRem } = functions;

    // styles for normal
    const normalStyles = () => ({
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        borderColor: color,
      },

      '& .MuiInput-root:after': {
        borderColor: color,
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: color,
      },
    });

    // styles for the input with error={true}
    const errorStyles = () => ({
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${pxToRem(9.6)} center`,
      backgroundSize: `${pxToRem(12.8)} ${pxToRem(12.8)}`,

      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        borderColor: colorError.main,
      },

      '& .MuiInput-root:after': {
        borderColor: colorError.main,
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: colorError.main,
      },
    });

    // styles for the input with success={true}
    const successStyles = () => ({
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${pxToRem(9.6)} center`,
      backgroundSize: `${pxToRem(12.8)} ${pxToRem(12.8)}`,

      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        borderColor: colorSuccess.main,
      },

      '& .MuiInput-root:after': {
        borderColor: colorSuccess.main,
      },

      '& .MuiInputLabel-root.Mui-focused': {
        color: colorSuccess.main,
      },
    });

    return {
      '& .MuiInputBase-root': {
        maxHeight: '60vh',
        lineHeight: 1.4
      },
      backgroundColor: disabled
        ? `${grey[200]} !important`
        : transparent.main,
      pointerEvents: disabled ? 'none' : 'auto',
      '& .MuiInputLabel-root.MuiInputLabel-outlined': {
        transform: `translate(14px, 14px) scale(1)`,
      },
      '& .MuiInputLabel-root.MuiInputLabel-outlined.MuiInputLabel-shrink':
      {
        transform: `translate(15px, -7px) scale(0.75)`,
      },
      ...(error && errorStyles()),
      ...(success && successStyles()),
      ...(!error && !success && normalStyles()),
    };
  },
);
