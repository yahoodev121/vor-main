import { ISorter } from 'src/modules/types';
import actions from 'src/modules/document/filter/documentFilterActions';

const initialData: {
  count: number;
  filter: any;
  loading: boolean;
  rows: Array<any>;
  sorter: ISorter;
} = {
  count: 0,
  filter: {},
  loading: false,
  rows: [] as Array<any>,
  sorter: {},
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      filter: payload ? payload.filter : {},
      sorter: payload ? payload.sorter : {},
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  return state;
};
