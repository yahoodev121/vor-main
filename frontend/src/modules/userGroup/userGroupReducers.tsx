import list from 'src/modules/userGroup/list/userGroupListReducers';
import form from 'src/modules/userGroup/form/userGroupFormReducers';
import view from 'src/modules/userGroup/view/userGroupViewReducers';
import destroy from 'src/modules/userGroup/destroy/userGroupDestroyReducers';
import importerReducer from 'src/modules/userGroup/importer/userGroupImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
