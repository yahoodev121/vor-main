import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaign.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectPreviewEmailTemplateLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.previewEmailTemplateLoading),
);

const selectCheckNameLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.checkNameLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectSendLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.sendLoading),
);

const campaignFormSelectors = {
  selectInitLoading,
  selectPreviewEmailTemplateLoading,
  selectCheckNameLoading,
  selectSaveLoading,
  selectSendLoading,
  selectRecord,
  selectRaw,
};

export default campaignFormSelectors;
