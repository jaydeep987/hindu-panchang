import { combineReducers } from 'redux';

import { advancePanchangDataReducer } from './advance-panchang';
import { monthlyPanchangApiReducer } from './monthly-panchang';
import { realmReducer } from './realm-reducer';

export default combineReducers({
  advancePanchangApiData: advancePanchangDataReducer,
  monthlyPanchangApiData: monthlyPanchangApiReducer,
  realm: realmReducer,
});
