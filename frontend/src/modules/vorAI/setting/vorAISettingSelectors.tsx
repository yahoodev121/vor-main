import { createSelector } from 'reselect';

const selectRaw = (state) => state.vorAI.setting;

const selectResponseFromAPIService = createSelector(
  [selectRaw],
  (raw) => {
    if (
      !raw.responseFromAPIService ||
      typeof raw.responseFromAPIService === 'string'
    ) {
      return raw.responseFromAPIService;
    }
    return JSON.stringify(
      raw.responseFromAPIService,
      null,
      2,
    );
  },
);

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectStatus = createSelector(
  [selectRaw],
  (raw) => raw.status,
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

const vorAISettingSelectors = {
  selectRaw,
  selectRecord,
  selectResponseFromAPIService,
  selectStatus,
  selectInitLoading,
  selectSaveLoading,
  selectSubmitLoading,
};

export default vorAISettingSelectors;
