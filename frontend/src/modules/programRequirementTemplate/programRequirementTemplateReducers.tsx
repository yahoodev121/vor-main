import { combineReducers } from 'redux';
import destroy from 'src/modules/programRequirementTemplate/destroy/programRequirementTemplateDestroyReducers';
import form from 'src/modules/programRequirementTemplate/form/programRequirementTemplateFormReducers';
import importerReducer from 'src/modules/programRequirementTemplate/importer/programRequirementTemplateImporterReducers';
import list from 'src/modules/programRequirementTemplate/list/programRequirementTemplateListReducers';
import view from 'src/modules/programRequirementTemplate/view/programRequirementTemplateViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
