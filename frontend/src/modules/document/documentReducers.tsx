import { combineReducers } from 'redux';
import destroy from 'src/modules/document/destroy/documentDestroyReducers';
import filter from 'src/modules/document/filter/documentFilterReducers';
import form from 'src/modules/document/form/documentFormReducers';
import list from 'src/modules/document/list/documentListReducers';

export default combineReducers({
  destroy,
  filter,
  form,
  list,
});
