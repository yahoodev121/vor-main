import list from 'src/modules/campaign/list/campaignListReducers';
import form from 'src/modules/campaign/form/campaignFormReducers';
import view from 'src/modules/campaign/view/campaignViewReducers';
import review from 'src/modules/campaign/review/campaignReviewReducers';
import destroy from 'src/modules/campaign/destroy/campaignDestroyReducers';
import importerReducer from 'src/modules/campaign/importer/campaignImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  review,
  destroy,
  importer: importerReducer,
});
