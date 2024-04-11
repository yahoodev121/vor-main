import { combineReducers } from 'redux';
import destroy from 'src/modules/programControlTemplate/destroy/programControlTemplateDestroyReducers';
import form from 'src/modules/programControlTemplate/form/programControlTemplateFormReducers';
import importerReducer from 'src/modules/programControlTemplate/importer/programControlTemplateImporterReducers';
import list from 'src/modules/programControlTemplate/list/programControlTemplateListReducers';
import view from 'src/modules/programControlTemplate/view/programControlTemplateViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
