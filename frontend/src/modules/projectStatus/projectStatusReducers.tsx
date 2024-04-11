import list from 'src/modules/projectStatus/list/projectStatusListReducers';
import form from 'src/modules/projectStatus/form/projectStatusFormReducers';
import view from 'src/modules/projectStatus/view/projectStatusViewReducers';
import destroy from 'src/modules/projectStatus/destroy/projectStatusDestroyReducers';
import importerReducer from 'src/modules/projectStatus/importer/projectStatusImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
