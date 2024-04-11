import { createSelector } from 'reselect';

const selectRaw = (state) => state.sessionDevice.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const sessionDeviceViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default sessionDeviceViewSelectors;
