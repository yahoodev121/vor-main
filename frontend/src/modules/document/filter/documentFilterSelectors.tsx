import { createSelector } from 'reselect';
import { getOrderBy } from 'src/modules/utils';

const selectRaw = (state) => state.document.filter;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectSorter = createSelector([selectRaw], (raw) => {
  return raw.sorter;
});

const documentFilterSelectors = {
  selectCount,
  selectFilter,
  selectHasRows,
  selectLoading,
  selectRows,
  selectSorter,
};

export default documentFilterSelectors;
