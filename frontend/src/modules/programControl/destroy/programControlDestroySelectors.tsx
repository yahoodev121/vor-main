import { createSelector } from 'reselect';

const selectRaw = (state) => state.programControl.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const programControlDestroySelectors = {
  selectLoading,
};

export default programControlDestroySelectors;
