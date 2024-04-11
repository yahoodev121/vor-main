import { getOrderBy } from 'src/modules/utils';
import { ISorter } from 'src/modules/types';
import DocumentService from 'src/modules/document/documentService';
import Errors from 'src/modules/shared/error/errors';
import selectors from 'src/modules/document/filter/documentFilterSelectors';

const prefix = 'DOCUMENT_FILTER';

const documentFilterActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const sorter = selectors.selectSorter(getState());
      dispatch(
        documentFilterActions.doFetch(filter, sorter),
      );
    },

  doFetch:
    (
      filter?,
      sorter: ISorter = {
        field: 'createdAt',
        order: 'desc',
      },
    ) =>
    async (dispatch) => {
      try {
        dispatch({
          type: documentFilterActions.FETCH_STARTED,
          payload: { filter, sorter },
        });

        const response = await DocumentService.filter(
          filter,
          getOrderBy(sorter),
        );

        dispatch({
          type: documentFilterActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: documentFilterActions.FETCH_ERROR,
        });
      }
    },
};

export default documentFilterActions;
