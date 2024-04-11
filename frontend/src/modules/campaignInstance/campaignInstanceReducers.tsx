import list from 'src/modules/campaignInstance/list/campaignInstanceListReducers';
import form from 'src/modules/campaignInstance/form/campaignInstanceFormReducers';
import view from 'src/modules/campaignInstance/view/campaignInstanceViewReducers';
import destroy from 'src/modules/campaignInstance/destroy/campaignInstanceDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
});
