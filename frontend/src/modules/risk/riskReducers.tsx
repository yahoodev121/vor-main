import { combineReducers } from 'redux';
import countByUser from 'src/modules/risk/countByUser/riskCountByUserReducers';
import destroy from 'src/modules/risk/destroy/riskDestroyReducers';
import form from 'src/modules/risk/form/riskFormReducers';
import importerReducer from 'src/modules/risk/importer/riskImporterReducers';
import list from 'src/modules/risk/list/riskListReducers';
import view from 'src/modules/risk/view/riskViewReducers';

export default combineReducers({
  countByUser,
  destroy,
  form,
  importer: importerReducer,
  list,
  view,
});
