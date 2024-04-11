import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.questionnaireTemplate.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const questionnaireTemplateViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default questionnaireTemplateViewSelectors;
