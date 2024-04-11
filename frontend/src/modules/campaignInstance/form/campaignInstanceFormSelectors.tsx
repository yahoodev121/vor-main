import { createSelector } from 'reselect';

const selectRaw = (state) => state.campaignInstance.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const selectSubmitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.submitLoading),
);

const campaignInstanceFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectSubmitLoading,
  selectRecord,
  selectRaw,
};

export default campaignInstanceFormSelectors;
