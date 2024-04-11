import { createSelector } from 'reselect';

const selectRaw = (state) => state.program.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programDestroySelectors = {
  selectLoading,
};

export default programDestroySelectors;
