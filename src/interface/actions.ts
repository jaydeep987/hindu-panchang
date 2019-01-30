import {
  AdvancePanchangApiActionTypes,
  MonthlyPanchangApiActionTypes,
  RealmActionTypes,
} from '../common/action-contants';

import { AdvancePanchangApiRequestParams } from '../actions/advance-panchang';
import { MonthlyPanchangRequestParams } from '../actions/monthly-panchang';

import { AdvancePanchangApiResponse } from './advance-panchang-api';
import { MonthlyPanchangApiResponse } from './monthly-panchang-api';

export interface AdvancePanchangApiFetchAction {
  type: AdvancePanchangApiActionTypes;
  reqParams: AdvancePanchangApiRequestParams;
}

export interface AdvancePanchangApiDataAction {
  type: AdvancePanchangApiActionTypes;
  advancePanchagApiData: AdvancePanchangApiResponse;
}

export interface AdvancePanchangApiErrorAction {
  type: AdvancePanchangApiActionTypes;
  error: Error;
}

export interface MutliMonthPanchangFetchAction {
  type: MonthlyPanchangApiActionTypes;
  reqParams: MonthlyPanchangRequestParams;
}

export interface MonthlyPanchangApiDataAction {
  type: MonthlyPanchangApiActionTypes;
  monthlyPanchangApiData: MonthlyPanchangApiResponse;
}

export interface MonthlyPanchangApiErrorAction {
  type: MonthlyPanchangApiActionTypes;
  error: Error;
}

export interface RealmAction {
  type: RealmActionTypes;
  realm: Realm;
}

export type AdvancePanchangApiActions = AdvancePanchangApiDataAction &
AdvancePanchangApiErrorAction;

export type MonthlyPanchangApiActions = MonthlyPanchangApiDataAction &
MonthlyPanchangApiErrorAction;

export type RealmActions = RealmAction;
