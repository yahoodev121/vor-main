import VendorService from 'src/modules/vendor/vendorService';
import selectors from 'src/modules/vendor/list/vendorListSelectors';
import { i18n } from 'src/i18n';
import exporterFields from 'src/modules/vendor/list/vendorListExporterFields';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'VENDOR_LIST';

const vendorListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  FETCH_IDS_STARTED: `${prefix}_FETCH_IDS_STARTED`,
  FETCH_IDS_SUCCESS: `${prefix}_FETCH_IDS_SUCCESS`,
  FETCH_IDS_ERROR: `${prefix}_FETCH_IDS_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: vendorListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: vendorListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: vendorListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: vendorListActions.RESETED,
    });

    dispatch(vendorListActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: vendorListActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await VendorService.list(
        { ...filter, export: 1 },
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('entities.vendor.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: vendorListActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: vendorListActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: vendorListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(vendorListActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: vendorListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(vendorListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        vendorListActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetchIds:
    (fnSuccess = null) =>
    async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      try {
        dispatch({
          type: vendorListActions.FETCH_IDS_STARTED,
        });

        const response = await VendorService.listIds(
          filter,
        );

        dispatch({
          type: vendorListActions.FETCH_IDS_SUCCESS,
        });

        fnSuccess && fnSuccess(response ?? []);
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: vendorListActions.FETCH_IDS_ERROR,
        });
      }
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: vendorListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await VendorService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: vendorListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: vendorListActions.FETCH_ERROR,
        });
      }
    },
};

export default vendorListActions;
