import list from 'src/modules/client/list/clientListReducers';
import form from 'src/modules/client/form/clientFormReducers';
import view from 'src/modules/client/view/clientViewReducers';
import destroy from 'src/modules/client/destroy/clientDestroyReducers';
import importerReducer from 'src/modules/client/importer/clientImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
