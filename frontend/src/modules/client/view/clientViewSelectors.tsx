import { createSelector } from 'reselect';

const selectRaw = (state) => state.client.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const clientViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default clientViewSelectors;
