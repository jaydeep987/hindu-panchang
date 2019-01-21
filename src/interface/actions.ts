import { AdvancePanchangApiActionTypes, RealmActionTypes } from '../common/action-contants';

import { AdvancePanchangApiResponse } from './advance-panchang-api';

export interface AdvancePanchangApiDataAction {
  type: AdvancePanchangApiActionTypes;
  advancePanchagApiData: AdvancePanchangApiResponse;
}

export interface AdvancePanchangApiErrorAction {
  type: AdvancePanchangApiActionTypes;
  error: Error;
}

export interface RealmAction {
  type: RealmActionTypes;
  realm: Realm;
}

export type AdvancePanchangApiActions = AdvancePanchangApiDataAction &
AdvancePanchangApiErrorAction;

export type RealmActions = RealmAction;
