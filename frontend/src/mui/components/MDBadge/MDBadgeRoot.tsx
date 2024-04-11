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
import Badge from '@mui/material/Badge';
import { styled, Theme } from '@mui/material/styles';

export default styled(Badge)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: any;
  }) => {
    const { palette, typography, borders, functions } =
      theme;
    const {
      color,
      circular,
      border,
      size,
      indicator,
      variant,
      container,
      paddingLeft,
      children,
    } = ownerState;

    const { white, dark, gradients, badgeColors } = palette;
    const { size: fontSize, fontWeightBold } = typography;
    const { borderRadius, borderWidth } = borders;
    const { pxToRem, linearGradient } = functions;

    // padding values
    const paddings: { [key: string]: string } = {
      xs: '0.2em 0.3em',
      sm: '0.3em 0.425em',
      md: '0.4em 0.525em',
      lg: '0.6em 0.8em',
    };

    // fontSize value
    const fontSizeValue = size === fontSize.md;

    // border value
    const borderValue = border
      ? `${borderWidth[1]} solid ${white.main}`
      : 'none';

    // borderRadius value
    const borderRadiusValue = circular
      ? borderRadius.section
      : borderRadius.md;

    // styles for the badge with indicator={true}
    const indicatorStyles = (sizeProp: string) => {
      let widthValue = pxToRem(16);
      let heightValue = pxToRem(16);

      if (sizeProp === 'medium') {
        widthValue = pxToRem(19.2);
        heightValue = pxToRem(19.2);
      } else if (sizeProp === 'large') {
        widthValue = pxToRem(25.6);
        heightValue = pxToRem(25.6);
      }

      return {
        width: widthValue,
        height: heightValue,
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        borderRadius: '50%',
        padding: 0,
        border: borderValue,
      };
    };

    // styles for the badge with variant="gradient"
    const gradientStyles = (colorProp: string) => {
      const backgroundValue = gradients[colorProp]
        ? linearGradient(
            gradients[colorProp].main,
            gradients[colorProp].state,
          )
        : linearGradient(
            gradients.info.main,
            gradients.info.state,
          );
      const colorValue =
        colorProp === 'light' ? dark.main : white.main;

      return {
        background: backgroundValue,
        color: colorValue,
      };
    };

    // styles for the badge with variant="outlined"
    const outlinedStyles = (colorProp: string) => {
      const backgroundValue = white.main;
      const colorValue = badgeColors[colorProp]
        ? badgeColors[colorProp].text
        : badgeColors.info.text;
      const borderValue = badgeColors[colorProp]
        ? `${borderWidth[2]} solid ${badgeColors[colorProp].background}`
        : `${borderWidth[2]} solid ${badgeColors.info.background}`;

      return {
        background: backgroundValue,
        color: colorValue,
        border: borderValue,
      };
    };

    // styles for the badge with variant="contained"
    const containedStyles = (colorProp: string) => {
      const backgroundValue = badgeColors[colorProp]
        ? badgeColors[colorProp].background
        : badgeColors.info.background;
      let colorValue = badgeColors[colorProp]
        ? badgeColors[colorProp].text
        : badgeColors.info.text;

      if (colorProp === 'light') {
        colorValue = dark.main;
      }
      return {
        background: backgroundValue,
        color: colorValue,
      };
    };

    // styles for the badge with no children and container={false}
    const standAloneStyles = () => ({
      position: 'static',
      marginLeft: pxToRem(6.4),
      transform: 'none',
      fontSize: pxToRem(7.2),
    });

    // styles for the badge with container={true}
    const containerStyles = () => ({
      position: 'relative',
      transform: 'none',
    });

    return {
      '& .MuiBadge-badge': {
        height: 'auto',
        padding: paddings[size] || paddings.xs,
        fontSize: fontSizeValue,
        fontWeight: fontWeightBold,
        textTransform: 'uppercase',
        lineHeight: 1,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'baseline',
        border: borderValue,
        borderRadius: borderRadiusValue,
        ...(indicator && indicatorStyles(size)),
        ...(variant === 'gradient' &&
          gradientStyles(color)),
        ...(variant === 'contained' &&
          containedStyles(color)),
        ...(variant === 'outlined' &&
          outlinedStyles(color)),
        ...(!children && !container && standAloneStyles()),
        ...(container && containerStyles()),
        top: 3,
        right: 0 - paddingLeft || 0,
      },
    };
  },
);
