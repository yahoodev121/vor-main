import { createSelector } from 'reselect';

const selectRaw = (state) => state.vorAI.form;

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

const selectStatus = createSelector(
  [selectRaw],
  (raw) => raw.status,
);

const selectSubmitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.submitLoading),
);

const vorAIFormSelectors = {
  selectRaw,
  selectResponseFromAPIService,
  selectStatus,
  selectSubmitLoading,
};

export default vorAIFormSelectors;
