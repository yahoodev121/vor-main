import list from 'src/modules/project/list/projectListReducers';
import form from 'src/modules/project/form/projectFormReducers';
import view from 'src/modules/project/view/projectViewReducers';
import destroy from 'src/modules/project/destroy/projectDestroyReducers';
import importerReducer from 'src/modules/project/importer/projectImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
