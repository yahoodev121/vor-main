import { combineReducers } from 'redux';
import destroy from 'src/modules/programRequirementGuidanceTemplate/destroy/programRequirementGuidanceTemplateDestroyReducers';
import form from 'src/modules/programRequirementGuidanceTemplate/form/programRequirementGuidanceTemplateFormReducers';
import importerReducer from 'src/modules/programRequirementGuidanceTemplate/importer/programRequirementGuidanceTemplateImporterReducers';
import list from 'src/modules/programRequirementGuidanceTemplate/list/programRequirementGuidanceTemplateListReducers';
import view from 'src/modules/programRequirementGuidanceTemplate/view/programRequirementGuidanceTemplateViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
