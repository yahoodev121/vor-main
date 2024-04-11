import UserGroupService from 'src/modules/userGroup/userGroupService';
import selectors from 'src/modules/userGroup/list/userGroupListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/userGroup/list/userGroupListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'USERGROUP_LIST';

const userGroupListActions = {
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

  SHOW_ALL_USER_GROUPS: `${prefix}_SHOW_ALL_USER_GROUPS`,

  doShowAllUserGroups:
    (showAllUsers) => async (dispatch) => {
      dispatch({
        type: userGroupListActions.SHOW_ALL_USER_GROUPS,
        payload: showAllUsers,
      });
      dispatch(userGroupListActions.doFetchCurrentFilter());
    },

  doClearAllSelected() {
    return {
      type: userGroupListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: userGroupListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: userGroupListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset:
    (onlyReset = false) =>
    async (dispatch) => {
      dispatch({
        type: userGroupListActions.RESETED,
      });

      !onlyReset &&
        dispatch(userGroupListActions.doFetch());
    },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: userGroupListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await UserGroupService.list(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.userGroup.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: userGroupListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userGroupListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: userGroupListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(userGroupListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: userGroupListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(userGroupListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        userGroupListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        const showAllUserGroups =
          selectors.selectShowAllUserGroups(getState());

        dispatch({
          type: userGroupListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await UserGroupService.list(
          { ...filter, showAllUserGroups },
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: userGroupListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: userGroupListActions.FETCH_ERROR,
        });
      }
    },
};

export default userGroupListActions;
