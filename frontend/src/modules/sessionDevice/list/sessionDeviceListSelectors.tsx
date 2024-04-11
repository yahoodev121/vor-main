import { createSelector } from 'reselect';

const selectRaw = (state) => state.sessionDevice.list;

const selectActive = createSelector(
  [selectRaw],
  (raw) => raw.active,
);

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

const selectSelectedKeys = createSelector(
  [selectRaw],
  (raw) => {
    return raw.selectedKeys;
  },
);

const selectSelectedRows = createSelector(
  [selectRaw, selectRows],
  (raw, rows) => {
    return rows.filter((row) =>
      raw.selectedKeys.includes(row.id),
    );
  },
);

const selectIsAllSelected = createSelector(
  [selectRows, selectSelectedKeys],
  (rows, selectedKeys) => {
    return rows.length === selectedKeys.length;
  },
);

const sessionDeviceListSelectors = {
  selectActive,
  selectLoading,
  selectRows,
  selectCount,
  selectSelectedKeys,
  selectSelectedRows,
  selectHasRows,
  selectIsAllSelected,
};

export default sessionDeviceListSelectors;
