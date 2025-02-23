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

/**
 * The base colors for the Material Dashboard 2 PRO React TSUI Dashboard PRO Material.
 * You can add new color using this file.
 * You can customized the colors for the entire Material Dashboard 2 PRO React TSUI Dashboard PRO Material using thie file.
 */

/** Importing for VOR Custom Colours */
import {
  yellow,
  orange,
  red,
  purple,
  green,
  lightGreen,
  grey,
  blue,
  indigo,
  deepPurple,
} from '@mui/material/colors';

// types
interface ColorsTypes {
  main: string;
  focus: string;
}

interface GradientsTypes {
  main: string;
  state: string;
}

interface SocialMediaColorsTypes {
  main: string;
  dark: string;
}

interface BadgeColorsTypes {
  background: string;
  text: string;
}

interface Types {
  background:
    | {
        default: string;
        sidenav?: string;
        card?: string;
      }
    | any;
  white:
    | {
        main: string;
        focus: string;
      }
    | any;
  text:
    | {
        main: string;
        focus: string;
        primary?: string;
        secondary?: string;
        disabled?: string;
      }
    | any;
  transparent:
    | {
        main: string;
      }
    | any;
  black:
    | {
        light: string;
        main: string;
        focus: string;
      }
    | any;
  primary: ColorsTypes | any;
  secondary: ColorsTypes | any;
  info: ColorsTypes | any;
  success: ColorsTypes | any;
  warning: ColorsTypes | any;
  error: ColorsTypes | any;
  light: ColorsTypes | any;
  dark: ColorsTypes | any;
  purple: ColorsTypes | any;

  orange: ColorsTypes | any;
  lightGreen: ColorsTypes | any;
  darkGreen: ColorsTypes | any;
  blue: ColorsTypes | any;

  /**VOR CUSTOM COLOURS */
  critical: ColorsTypes | any;
  high: ColorsTypes | any;
  medium: ColorsTypes | any;
  low: ColorsTypes | any;
  none: ColorsTypes | any;

  backlog: ColorsTypes | any;
  todo: ColorsTypes | any;
  inprogress: ColorsTypes | any;
  /**complete: ColorsTypes | any;*/

  /**active: ColorsTypes | any;*/
  inactive: ColorsTypes | any;

  open: ColorsTypes | any;
  acceptance: ColorsTypes | any;
  avoidance: ColorsTypes | any;
  mitigation: ColorsTypes | any;
  /**remediation: ColorsTypes | any;*/
  transfer: ColorsTypes | any;

  /** Task Display Color */
  taskDisplayColors: {
    red: ColorsTypes | any;
    orange: ColorsTypes | any;
    yellow: ColorsTypes | any;
    green: ColorsTypes | any;
    blue: ColorsTypes | any;
    indigo: ColorsTypes | any;
    violet: ColorsTypes | any;
  };

  grey:
    | {
        [key: string | number]: string;
      }
    | any;
  gradients:
    | {
        primary: GradientsTypes;
        secondary: GradientsTypes;
        info: GradientsTypes;
        success: GradientsTypes;
        warning: GradientsTypes;
        error: GradientsTypes;
        light: GradientsTypes;
        dark: GradientsTypes;
        purple: GradientsTypes;
      }
    | any;
  socialMediaColors:
    | {
        facebook: SocialMediaColorsTypes;
        twitter: SocialMediaColorsTypes;
        instagram: SocialMediaColorsTypes;
        linkedin: SocialMediaColorsTypes;
        pinterest: SocialMediaColorsTypes;
        youtube: SocialMediaColorsTypes;
        vimeo: SocialMediaColorsTypes;
        slack: SocialMediaColorsTypes;
        dribbble: SocialMediaColorsTypes;
        github: SocialMediaColorsTypes;
        reddit: SocialMediaColorsTypes;
        tumblr: SocialMediaColorsTypes;
      }
    | any;
  badgeColors:
    | {
        primary: BadgeColorsTypes;
        secondary: BadgeColorsTypes;
        info: BadgeColorsTypes;
        success: BadgeColorsTypes;
        warning: BadgeColorsTypes;
        error: BadgeColorsTypes;
        light: BadgeColorsTypes;
        dark: BadgeColorsTypes;
        purple: BadgeColorsTypes;
      }
    | any;
  coloredShadows:
    | {
        [key: string]: string;
      }
    | any;
  inputBorderColor: string;
  tabs:
    | {
        indicator:
          | {
              boxShadow: string;
            }
          | any;
      }
    | any;
}

const colors: Types = {
  background: {
    default: '#1a2035',
    sidenav: '#1f283e',
    card: '#202940',
  },

  text: {
    main: '#ffffffcc',
    focus: '#ffffffcc',
  },

  transparent: {
    main: 'transparent',
  },

  white: {
    main: '#ffffff',
    focus: '#ffffff',
  },

  black: {
    light: '#000000',
    main: '#000000',
    focus: '#000000',
  },

  primary: {
    main: '#e91e63',
    focus: '#e91e63',
  },

  secondary: {
    main: '#7b809a',
    focus: '#8f93a9',
  },

  info: {
    main: '#1A73E8',
    focus: '#1662C4',
  },

  success: {
    /**  main: '#4CAF50',
    focus: '#67bb6a',*/
    main: '#66BB6A',
    focus: '#43A047',
  },

  warning: {
    main: '#fb8c00',
    focus: '#fc9d26',
  },

  error: {
    main: '#F44335',
    focus: '#f65f53',
  },

  light: {
    main: '#f0f2f566',
    focus: '#f0f2f566',
  },

  dark: {
    main: '#344767',
    focus: '#2c3c58',
  },

  grey: {
    100: '#f8f9fa',
    200: '#f0f2f5',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#6c757d',
    700: '#495057',
    800: '#343a40',
    900: '#212529',
  },

  purple: {
    main: '#6d65f9',
    focus: '#6d65f9',
  },

  orange: {
    main: orange[900],
    focus: orange[900],
  },

  lightGreen: {
    main: lightGreen[300],
    focus: lightGreen[300],
  },

  darkGreen: {
    main: green[900],
    focus: green[900],
  },

  blue: {
    main: blue[600],
    focus: blue[600],
  },

  /**
   * VOR CUSTOM COLOURS
   */

  critical: {
    main: red['A700'],
    focus: red['A700'],
  },

  high: {
    main: red[300],
    focus: red[300],
  },

  medium: {
    main: yellow[900],
    focus: yellow[900],
  },

  low: {
    main: yellow['A700'],
    focus: yellow['A700'],
  },

  none: {
    main: '#1A73E8',
    focus: '#1662C4',
  },

  backlog: {
    main: grey[500],
    focus: grey[500],
  },

  todo: {
    main: '#1A73E8',
    focus: '#1662C4',
  },

  inprogress: {
    main: purple[300],
    focus: purple[300],
  },

  /**complete: {
    main: green[700],
    focus: green[700],
  },

  active: {
    main: green[700],
    focus: green[700],
  },*/

  inactive: {
    main: grey[500],
    focus: grey[500],
  },

  open: {
    main: grey[500],
    focus: grey[500],
  },

  acceptance: {
    main: lightGreen[300],
    focus: lightGreen[300],
  },

  avoidance: {
    main: lightGreen[300],
    focus: lightGreen[300],
  },

  mitigation: {
    main: lightGreen[300],
    focus: lightGreen[300],
  },

  /**remediation: {
    main: green[700],
    focus: green[700],
  },**/

  transfer: {
    main: lightGreen[300],
    focus: lightGreen[300],
  },

  /** Task Display Color */
  taskDisplayColors: {
    red: {
      main: '#ea4335',
      focus: '#ea4335',
    },
    orange: {
      main: '#ff7b25',
      focus: '#ff7b25',
    },
    yellow: {
      main: '#feb236',
      focus: '#feb236',
    },
    green: {
      main: '#4CAF50',
      focus: '#4CAF50',
    },
    blue: {
      main: '#1A73E8',
      focus: '#1A73E8',
    },
    indigo: {
      main: '#3f51b5',
      focus: '#3f51b5',
    },
    violet: {
      main: '#9c27b0',
      focus: '#9c27b0',
    },
  },

  gradients: {
    primary: {
      main: '#EC407A',
      state: '#D81B60',
    },

    secondary: {
      main: '#747b8a',
      state: '#495361',
    },

    info: {
      main: '#49a3f1',
      state: '#1A73E8',
    },

    success: {
      main: '#66BB6A',
      state: '#43A047',
    },

    warning: {
      main: '#FFA726',
      state: '#FB8C00',
    },

    error: {
      main: '#EF5350',
      state: '#E53935',
    },

    light: {
      main: '#EBEFF4',
      state: '#CED4DA',
    },

    dark: {
      main: '#323a54',
      state: '#1a2035',
    },

    purple: {
      main: '#6d65f9',
      state: '#6d65f9',
    },
  },

  socialMediaColors: {
    facebook: {
      main: '#3b5998',
      dark: '#344e86',
    },

    twitter: {
      main: '#55acee',
      dark: '#3ea1ec',
    },

    instagram: {
      main: '#125688',
      dark: '#0e456d',
    },

    linkedin: {
      main: '#0077b5',
      dark: '#00669c',
    },

    pinterest: {
      main: '#cc2127',
      dark: '#b21d22',
    },

    youtube: {
      main: '#e52d27',
      dark: '#d41f1a',
    },

    vimeo: {
      main: '#1ab7ea',
      dark: '#13a3d2',
    },

    slack: {
      main: '#3aaf85',
      dark: '#329874',
    },

    dribbble: {
      main: '#ea4c89',
      dark: '#e73177',
    },

    github: {
      main: '#24292e',
      dark: '#171a1d',
    },

    reddit: {
      main: '#ff4500',
      dark: '#e03d00',
    },

    tumblr: {
      main: '#35465c',
      dark: '#2a3749',
    },
  },

  badgeColors: {
    primary: {
      background: '#f8b3ca',
      text: '#cc084b',
    },

    secondary: {
      background: '#d7d9e1',
      text: '#6c757d',
    },

    info: {
      background: '#aecef7',
      text: '#095bc6',
    },

    success: {
      background: '#bce2be',
      text: '#339537',
    },

    warning: {
      background: '#ffd59f',
      text: '#c87000',
    },

    error: {
      background: '#fcd3d0',
      text: '#f61200',
    },

    light: {
      background: '#ffffff',
      text: '#c7d3de',
    },

    dark: {
      background: '#8097bf',
      text: '#1e2e4a',
    },
    purple: {
      background: '#6d65f9',
      text: '#6d65f9',
    },
  },

  coloredShadows: {
    primary: '#e91e62',
    secondary: '#110e0e',
    info: '#00bbd4',
    success: '#4caf4f',
    warning: '#ff9900',
    error: '#f44336',
    light: '#adb5bd',
    dark: '#404040',
    purple: '#6d65f9',
  },

  inputBorderColor: '#d2d6da',

  tabs: {
    indicator: { boxShadow: '#ddd' },
  },
};

export default colors;
