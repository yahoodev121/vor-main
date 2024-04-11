import list from 'src/modules/questionnaireTemplate/list/questionnaireTemplateListReducers';
import form from 'src/modules/questionnaireTemplate/form/questionnaireTemplateFormReducers';
import view from 'src/modules/questionnaireTemplate/view/questionnaireTemplateViewReducers';
import destroy from 'src/modules/questionnaireTemplate/destroy/questionnaireTemplateDestroyReducers';
import importerReducer from 'src/modules/questionnaireTemplate/importer/questionnaireTemplateImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
