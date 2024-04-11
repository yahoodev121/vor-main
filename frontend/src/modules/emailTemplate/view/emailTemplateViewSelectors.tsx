import { createSelector } from 'reselect';

const selectRaw = (state) => state.emailTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const emailTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default emailTemplateViewSelectors;
