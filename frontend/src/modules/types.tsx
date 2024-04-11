// #region Color Enums
export type TThemeColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'purple';
// #endregion

// #region View Modes
export type TViewMode = 'grid' | 'list';
export const GRID_MODE = 'grid';
export const LIST_MODE = 'list';
// #endregion

// #region MUI State
export interface IViewMode {
  section: string;
  viewMode: TViewMode;
}

export interface IMuiState {
  loading: boolean;
  miniSidenav4View: boolean;
  miniSettingnavView: boolean;
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor: TThemeColor;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  openAIConfigurator: boolean;
  direction: 'ltr' | 'rtl';
  layout: 'dashboard' | 'page' | '';
  darkMode: boolean;
  viewModes: Array<IViewMode>;
  gridHeights: {
    [key: string]: number;
  };
}
// #endregion

// #region Reducer State Types
export interface ISorter {
  field?: string;
  order?: 'asc' | 'desc';
}
// #endregion
