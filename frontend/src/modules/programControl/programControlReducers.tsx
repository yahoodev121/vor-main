import { combineReducers } from 'redux';
import destroy from 'src/modules/programControl/destroy/programControlDestroyReducers';
import form from 'src/modules/programControl/form/programControlFormReducers';
import importerReducer from 'src/modules/programControl/importer/programControlImporterReducers';
import list from 'src/modules/programControl/list/programControlListReducers';
import view from 'src/modules/programControl/view/programControlViewReducers';
import listView from 'src/modules/programControl/listView/programControlListViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
  listView,
});
