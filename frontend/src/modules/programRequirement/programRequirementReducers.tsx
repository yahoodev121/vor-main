import { combineReducers } from 'redux';
import destroy from 'src/modules/programRequirement/destroy/programRequirementDestroyReducers';
import form from 'src/modules/programRequirement/form/programRequirementFormReducers';
import importerReducer from 'src/modules/programRequirement/importer/programRequirementImporterReducers';
import list from 'src/modules/programRequirement/list/programRequirementListReducers';
import view from 'src/modules/programRequirement/view/programRequirementViewReducers';
import listView from 'src/modules/programRequirement/listView/programRequirementListViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
  listView,
});
