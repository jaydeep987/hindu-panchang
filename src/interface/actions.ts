import { AdvancePanchangApiActionTypes } from '../common/action-contants';

import { AdvancePanchangApiResponse } from './advance-panchang-api';

export interface AdvancePanchangApiDataAction {
  type: AdvancePanchangApiActionTypes;
  advancePanchagApiData: AdvancePanchangApiResponse;
}

export interface AdvancePanchangApiErrorAction {
  type: AdvancePanchangApiActionTypes;
  error: Error;
}

export type AdvancePanchangApiActions = AdvancePanchangApiDataAction &
AdvancePanchangApiErrorAction;
