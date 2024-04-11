import { combineReducers } from 'redux';
import destroy from 'src/modules/highlight/destroy/highlightDestroyReducers';
import form from 'src/modules/highlight/form/highlightFormReducers';
import importerReducer from 'src/modules/highlight/importer/highlightImporterReducers';
import list from 'src/modules/highlight/list/highlightListReducers';
import view from 'src/modules/highlight/view/highlightViewReducers';
import quick from 'src/modules/highlight/quick/highlightQuickReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
  quick,
});
