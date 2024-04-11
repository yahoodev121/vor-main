import list from 'src/modules/projectType/list/projectTypeListReducers';
import form from 'src/modules/projectType/form/projectTypeFormReducers';
import view from 'src/modules/projectType/view/projectTypeViewReducers';
import destroy from 'src/modules/projectType/destroy/projectTypeDestroyReducers';
import importerReducer from 'src/modules/projectType/importer/projectTypeImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
