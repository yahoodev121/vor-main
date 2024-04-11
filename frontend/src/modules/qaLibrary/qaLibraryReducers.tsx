import list from 'src/modules/qaLibrary/list/qaLibraryListReducers';
import form from 'src/modules/qaLibrary/form/qaLibraryFormReducers';
import view from 'src/modules/qaLibrary/view/qaLibraryViewReducers';
import destroy from 'src/modules/qaLibrary/destroy/qaLibraryDestroyReducers';
import importerReducer from 'src/modules/qaLibrary/importer/qaLibraryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
