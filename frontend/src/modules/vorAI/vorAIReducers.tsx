import { combineReducers } from 'redux';
import form from 'src/modules/vorAI/form/vorAIFormReducers';
import setting from 'src/modules/vorAI/setting/vorAISettingReducers';
import importerReducer from 'src/modules/vorAI/importer/vorAIImporterReducers';

export default combineReducers({
  form,
  setting,
  importer: importerReducer,
});
