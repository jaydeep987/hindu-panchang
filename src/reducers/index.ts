import { combineReducers } from 'redux';

import { advancePanchangDataReducer } from './advance-panchang';
import { realmReducer } from './realm-reducer';

export default combineReducers({
  advancePanchangApiData: advancePanchangDataReducer,
  realm: realmReducer,
});
