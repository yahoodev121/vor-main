import { IMuiState, IViewMode } from 'src/modules/types';
import actions from 'src/modules/mui/muiActions';
import AuthCurrentTenant from '../auth/authCurrentTenant';

const defaultSettings = AuthCurrentTenant.getMuiSettings();

const initialState: IMuiState = {
  loading: false,
  miniSidenav4View: false,
  miniSettingnavView: true,
  miniSidenav: true,
  transparentSidenav: false,
  whiteSidenav: false,
  sidenavColor: 'info',
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  openAIConfigurator: false,
  direction: 'ltr',
  layout: '',
  darkMode: false,
  viewModes: [],
  gridHeights: {},
};

export function rebuildViewModes(
  newOne: IViewMode,
  viewModes: Array<IViewMode> = [],
) {
  if (Array.isArray(viewModes)) {
    return [
      ...viewModes.filter(
        (vm) => vm.section !== newOne.section,
      ),
      newOne,
    ];
  }
  return [newOne];
}

function filterState(state) {
  if (state === undefined) {
    return;
  }
  for (const key in state) {
    if (initialState[key] === undefined) {
      delete state[key];
    }
  }
}

export default (
  state = initialState,
  { type, value, payload },
) => {
  console.log('reducer')
  if (type === actions.INIT_RESET) {
    return {
      ...state,
      ...initialState,
    };
  }

  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    filterState(payload);
    return {
      ...state,
      ...payload,
      miniSidenav4View: payload.miniSidenav,
    };
  }

  if (type === actions.INIT_ERROR) {
    filterState(defaultSettings);
    return {
      ...state,
      ...defaultSettings,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
    };
  }

  if (type === actions.MINI_SIDENAV_4_VIEW) {
    return {
      ...state,
      miniSidenav4View: value,
    };
  }

  if (type === actions.MINI_SETTINGNAV_VIEW) {
    return {
      ...state,
      miniSettingnavView: value,
    };
  }

  if (type === actions.MINI_SIDENAV) {
    return {
      ...state,
      miniSidenav: value,
    };
  }

  if (type === actions.TRANSPARENT_SIDENAV) {
    return {
      ...state,
      transparentSidenav: value,
    };
  }

  if (type === actions.WHITE_SIDENAV) {
    return {
      ...state,
      whiteSidenav: value,
    };
  }

  if (type === actions.SIDENAV_COLOR) {
    return {
      ...state,
      sidenavColor: value,
    };
  }

  if (type === actions.TRANSPARENT_NAVBAR) {
    return {
      ...state,
      transparentNavbar: value,
    };
  }

  if (type === actions.FIXED_NAVBAR) {
    return {
      ...state,
      fixedNavbar: value,
    };
  }

  if (type === actions.OPEN_CONFIGURATOR) {
    return {
      ...state,
      openConfigurator: value,
    };
  }

  if (type === actions.OPEN_AICONFIGURATOR) {
    return {
      ...state,
      openAIConfigurator: value,
    };
  }

  if (type === actions.DIRECTION) {
    return {
      ...state,
      direction: value,
    };
  }

  if (type === actions.LAYOUT) {
    return {
      ...state,
      layout: value,
    };
  }

  if (type === actions.DARKMODE) {
    return {
      ...state,
      darkMode: value,
    };
  }

  if (type === actions.VIEW_MODE) {
    return {
      ...state,
      viewModes: rebuildViewModes(
        value,
        state.viewModes || [],
      ),
    };
  }

  if (type === actions.GRID_HEIGHT) {
    return {
      ...state,
      gridHeights: {
        ...state.gridHeights,
        ...payload,
      },
    };
  }

  return state;
};
