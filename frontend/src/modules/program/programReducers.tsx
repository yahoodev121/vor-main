import { combineReducers } from 'redux';
import destroy from 'src/modules/program/destroy/programDestroyReducers';
import form from 'src/modules/program/form/programFormReducers';
import importerReducer from 'src/modules/program/importer/programImporterReducers';
import list from 'src/modules/program/list/programListReducers';
import view from 'src/modules/program/view/programViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
