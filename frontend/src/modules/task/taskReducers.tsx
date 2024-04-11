import { combineReducers } from 'redux';
import countByUser from 'src/modules/task/countByUser/taskCountByUserReducers';
import destroy from 'src/modules/task/destroy/taskDestroyReducers';
import form from 'src/modules/task/form/taskFormReducers';
import importerReducer from 'src/modules/task/importer/taskImporterReducers';
import list from 'src/modules/task/list/taskListReducers';
import view from 'src/modules/task/view/taskViewReducers';

export default combineReducers({
  countByUser,
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
