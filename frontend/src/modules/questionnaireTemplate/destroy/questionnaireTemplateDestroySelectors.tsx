import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.questionnaireTemplate.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const questionnaireTemplateDestroySelectors = {
  selectLoading,
};

export default questionnaireTemplateDestroySelectors;
