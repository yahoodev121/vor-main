import { createSelector } from 'reselect';

const selectRaw = (state) => state.emailTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const emailTemplateDestroySelectors = {
  selectLoading,
};

export default emailTemplateDestroySelectors;
