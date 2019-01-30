import { combineEpics } from 'redux-observable';

import { advancePanchangEpic } from './advance-panchang';
import { fetchMultiMonthlyPanchang } from './monthly-panchang';

export default combineEpics(
  advancePanchangEpic,
  fetchMultiMonthlyPanchang,
);
