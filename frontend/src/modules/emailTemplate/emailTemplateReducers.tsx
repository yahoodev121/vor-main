import list from 'src/modules/emailTemplate/list/emailTemplateListReducers';
import form from 'src/modules/emailTemplate/form/emailTemplateFormReducers';
import view from 'src/modules/emailTemplate/view/emailTemplateViewReducers';
import destroy from 'src/modules/emailTemplate/destroy/emailTemplateDestroyReducers';
import importerReducer from 'src/modules/emailTemplate/importer/emailTemplateImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
