import { combineReducers } from 'redux';
import destroy from 'src/modules/programTemplate/destroy/programTemplateDestroyReducers';
import form from 'src/modules/programTemplate/form/programTemplateFormReducers';
import importerReducer from 'src/modules/programTemplate/importer/programTemplateImporterReducers';
import list from 'src/modules/programTemplate/list/programTemplateListReducers';
import metaList from 'src/modules/programTemplate/metaList/programTemplateMetaListReducers';
import summarizing from 'src/modules/programTemplate/summarizing/programTemplateSummarizingReducers';
import view from 'src/modules/programTemplate/view/programTemplateViewReducers';

export default combineReducers({
  destroy,
  form,
  importer: importerReducer,
  list,
  metaList,
  summarizing,
  view,
});
