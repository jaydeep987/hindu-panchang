import { combineReducers } from 'redux';

import { advancePanchangDataReducer } from './advance-panchang';

export default combineReducers({
  advancePanchangApiData: advancePanchangDataReducer,
});
