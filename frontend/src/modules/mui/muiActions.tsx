import { getHistory } from 'src/modules/store';
import { rebuildViewModes } from 'src/modules/mui/muiReducers';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import authSelectors from 'src/modules/auth/authSelectors';
import Errors from 'src/modules/shared/error/errors';
import muiSelectors from 'src/modules/mui/muiSelectors';
import MuiService from 'src/modules/mui/muiService';

const prefix = 'MUI_ACTIONS';

const muiActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  INIT_RESET: `${prefix}_INIT_RESET`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  MINI_SIDENAV_4_VIEW: `${prefix}_MINI_SIDENAV_4_VIEW`,
  MINI_SETTINGNAV_VIEW: `${prefix}_MINI_SETTINGNAV_VIEW`,
  MINI_SIDENAV: `${prefix}_MINI_SIDENAV`,
  TRANSPARENT_SIDENAV: `${prefix}_TRANSPARENT_SIDENAV`,
  WHITE_SIDENAV: `${prefix}_WHITE_SIDENAV`,
  SIDENAV_COLOR: `${prefix}_SIDENAV_COLOR`,
  TRANSPARENT_NAVBAR: `${prefix}_TRANSPARENT_NAVBAR`,
  FIXED_NAVBAR: `${prefix}_FIXED_NAVBAR`,
  OPEN_CONFIGURATOR: `${prefix}_OPEN_CONFIGURATOR`,
  OPEN_AICONFIGURATOR: `${prefix}_OPEN_AICONFIGURATOR`,
  DIRECTION: `${prefix}_DIRECTION`,
  LAYOUT: `${prefix}_LAYOUT`,
  DARKMODE: `${prefix}_DARKMODE`,
  VIEW_MODE: `${prefix}_VIEW_MODE`,

  GRID_HEIGHT: `${prefix}_GRID_HEIGHT`,

  doMiniSidenav4View: (value) => async (dispatch) => {
    dispatch({
      type: muiActions.MINI_SIDENAV_4_VIEW,
      value: value,
    });
    if (!value) {
      dispatch({
        type: muiActions.MINI_SETTINGNAV_VIEW,
        value: true,
      });
    }
  },

  doMiniSettingnavView: (value) => async (dispatch) => {
    dispatch({
      type: muiActions.MINI_SETTINGNAV_VIEW,
      value: value,
    });
    if (!value) {
      dispatch({
        type: muiActions.MINI_SIDENAV_4_VIEW,
        value: true,
      });
    }
  },

  doMiniSidenav: (value) => async (dispatch) => {
    dispatch(muiActions.doMiniSidenav4View(value));
    dispatch({
      type: muiActions.MINI_SIDENAV,
      value: value,
    });
  },

  doTransparentSidenav: (value) => {
    return {
      type: muiActions.TRANSPARENT_SIDENAV,
      value: value,
    };
  },

  doWhiteSidenav: (value) => {
    return {
      type: muiActions.WHITE_SIDENAV,
      value: value,
    };
  },

  doSidenavColor: (value) => {
    return {
      type: muiActions.SIDENAV_COLOR,
      value: value,
    };
  },

  doTransparentNavbar: (value) => {
    return {
      type: muiActions.TRANSPARENT_NAVBAR,
      value: value,
    };
  },

  doFixedNavbar: (value) => {
    return {
      type: muiActions.FIXED_NAVBAR,
      value: value,
    };
  },

  doOpenConfigurator: (value) => {
    return {
      type: muiActions.OPEN_CONFIGURATOR,
      value: value,
    };
  },

  doOpenAIConfigurator: (value) => {
    return {
      type: muiActions.OPEN_AICONFIGURATOR,
      value: value,
    };
  },

  doDirection: (value) => {
    return {
      type: muiActions.DIRECTION,
      value: value,
    };
  },

  doLayout: (value) => {
    return {
      type: muiActions.LAYOUT,
      value: value,
    };
  },

  doDarkMode: (value) => {
    return {
      type: muiActions.DARKMODE,
      value: value,
    };
  },

  doViewMode: (viewMode) => (dispatch, getState) => {
    const viewModes = muiSelectors.selectViewModes(
      getState(),
    );

    dispatch(
      muiActions.doSave({
        viewModes: rebuildViewModes(viewMode, viewModes),
      }),
    );

    dispatch({
      type: muiActions.VIEW_MODE,
      value: viewMode,
    });
  },

  doInit: () => async (dispatch, getState) => {
    try {
      if (
        !authSelectors.selectSignedIn(getState()) ||
        !AuthCurrentTenant.get()
      ) {
        return;
      }

      const settings = await MuiService.find();

      dispatch({
        type: muiActions.INIT_SUCCESS,
        payload: settings,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: muiActions.INIT_ERROR,
      });

      getHistory().push('/');
    }
  },

  doSave: (values) => async (dispatch, getState) => {
    try {
      await MuiService.save(values);
    } catch (error) {
      Errors.handle(error);
    }
  },

  doGridHeights: (key, height) => {
    return {
      type: muiActions.GRID_HEIGHT,
      payload: { [key]: height },
    };
  },
};

export default muiActions;
