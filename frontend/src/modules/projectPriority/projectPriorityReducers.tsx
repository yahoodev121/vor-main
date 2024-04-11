import list from 'src/modules/projectPriority/list/projectPriorityListReducers';
import form from 'src/modules/projectPriority/form/projectPriorityFormReducers';
import view from 'src/modules/projectPriority/view/projectPriorityViewReducers';
import destroy from 'src/modules/projectPriority/destroy/projectPriorityDestroyReducers';
import importerReducer from 'src/modules/projectPriority/importer/projectPriorityImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
