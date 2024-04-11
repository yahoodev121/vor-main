import { combineReducers } from 'redux';
import list from 'src/modules/sessionDevice/list/sessionDeviceListReducers';
import view from 'src/modules/sessionDevice/view/sessionDeviceViewReducers';

export default combineReducers({
  list,
  view,
});
