import list from 'src/modules/clientCategory/list/clientCategoryListReducers';
import form from 'src/modules/clientCategory/form/clientCategoryFormReducers';
import view from 'src/modules/clientCategory/view/clientCategoryViewReducers';
import destroy from 'src/modules/clientCategory/destroy/clientCategoryDestroyReducers';
import importerReducer from 'src/modules/clientCategory/importer/clientCategoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
