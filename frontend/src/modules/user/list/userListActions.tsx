import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';
import exporterFields from 'src/modules/user/list/userListExporterFields';
import Message from 'src/view/shared/message';
import selectors from 'src/modules/user/list/userListSelectors';
import UserService from 'src/modules/user/userService';

const prefix = 'USER_LIST';

const userListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  ACTIVATE_ALL_SELECTED_STARTED: `${prefix}_ACTIVATE_ALL_SELECTED_STARTED`,
  ACTIVATE_ALL_SELECTED_SUCCESS: `${prefix}_ACTIVATE_ALL_SELECTED_SUCCESS`,
  ACTIVATE_ALL_SELECTED_ERROR: `${prefix}_ACTIVATE_ALL_SELECTED_ERROR`,

  DEACTIVATE_ALL_SELECTED_STARTED: `${prefix}_DEACTIVATE_ALL_SELECTED_STARTED`,
  DEACTIVATE_ALL_SELECTED_SUCCESS: `${prefix}_DEACTIVATE_ALL_SELECTED_SUCCESS`,
  DEACTIVATE_ALL_SELECTED_ERROR: `${prefix}_DEACTIVATE_ALL_SELECTED_ERROR`,

  DESTROY_ALL_SELECTED_STARTED: `${prefix}_DESTROY_ALL_SELECTED_STARTED`,
  DESTROY_ALL_SELECTED_SUCCESS: `${prefix}_DESTROY_ALL_SELECTED_SUCCESS`,
  DESTROY_ALL_SELECTED_ERROR: `${prefix}_DESTROY_ALL_SELECTED_ERROR`,

  ACTIVATE_STARTED: `${prefix}_ACTIVATE_STARTED`,
  ACTIVATE_SUCCESS: `${prefix}_ACTIVATE_SUCCESS`,
  ACTIVATE_ERROR: `${prefix}_ACTIVATE_ERROR`,

  DEACTIVATE_STARTED: `${prefix}_DEACTIVATE_STARTED`,
  DEACTIVATE_SUCCESS: `${prefix}_DEACTIVATE_SUCCESS`,
  DEACTIVATE_ERROR: `${prefix}_DEACTIVATE_ERROR`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  SHOW_ALL_USERS: `${prefix}_SHOW_ALL_USERS`,

  doClearAllSelected() {
    return {
      type: userListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: userListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: userListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset:
    (onlyReset = false) =>
    async (dispatch) => {
      dispatch({
        type: userListActions.RESETED,
      });

      !onlyReset && dispatch(userListActions.doFetch());
    },

  doShowAllUsers: (showAllUsers) => async (dispatch) => {
    dispatch({
      type: userListActions.SHOW_ALL_USERS,
      payload: showAllUsers,
    });
    dispatch(userListActions.doFetchCurrentFilter());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: userListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await UserService.fetchUsers(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('user.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: userListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: userListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: userListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(userListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        userListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        const showAllUsers = selectors.selectShowAllUsers(
          getState(),
        );

        dispatch({
          type: userListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await UserService.fetchUsers(
          { ...filter, showAllUsers },
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: userListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userListActions.FETCH_ERROR,
        });
      }
    },

  doActivate: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userListActions.ACTIVATE_STARTED,
      });

      await UserService.activate([id]);

      dispatch({
        type: userListActions.ACTIVATE_SUCCESS,
      });

      Message.success(i18n('user.doActivateSuccess'));

      dispatch(userListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.ACTIVATE_ERROR,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    }
  },

  doDeactivate: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userListActions.DEACTIVATE_STARTED,
      });

      await UserService.deactivate([id]);

      dispatch({
        type: userListActions.DEACTIVATE_SUCCESS,
      });

      Message.success(i18n('user.doDeactivateSuccess'));

      dispatch(userListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.DEACTIVATE_ERROR,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    }
  },

  doDestroy: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userListActions.DESTROY_STARTED,
      });

      await UserService.destroy([id]);

      dispatch({
        type: userListActions.DESTROY_SUCCESS,
      });

      Message.success(i18n('user.doDestroySuccess'));

      dispatch(userListActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userListActions.DESTROY_ERROR,
      });

      dispatch(userListActions.doFetchCurrentFilter());
    }
  },

  doActivateAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: userListActions.ACTIVATE_ALL_SELECTED_STARTED,
        });

        await UserService.activate(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: userListActions.ACTIVATE_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('user.doActivateAllSelectedSuccess'),
        );

        dispatch(userListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userListActions.ACTIVATE_ALL_SELECTED_ERROR,
        });

        dispatch(userListActions.doFetchCurrentFilter());
      }
    },

  doDeactivateAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: userListActions.DEACTIVATE_ALL_SELECTED_STARTED,
        });

        await UserService.deactivate(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: userListActions.DEACTIVATE_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('user.doDeactivateAllSelectedSuccess'),
        );

        dispatch(userListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userListActions.DEACTIVATE_ALL_SELECTED_ERROR,
        });

        dispatch(userListActions.doFetchCurrentFilter());
      }
    },

  doDestroyAllSelected:
    () => async (dispatch, getState) => {
      try {
        const selectedRows = selectors.selectSelectedRows(
          getState(),
        );

        dispatch({
          type: userListActions.DESTROY_ALL_SELECTED_STARTED,
        });

        await UserService.destroy(
          selectedRows.map((row) => row.id),
        );

        dispatch({
          type: userListActions.DESTROY_ALL_SELECTED_SUCCESS,
        });

        Message.success(
          i18n('user.doDestroyAllSelectedSuccess'),
        );

        dispatch(userListActions.doFetchCurrentFilter());
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userListActions.DESTROY_ALL_SELECTED_ERROR,
        });

        dispatch(userListActions.doFetchCurrentFilter());
      }
    },
};

export default userListActions;
