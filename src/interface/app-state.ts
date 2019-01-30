import { AdvancePanchangApiResponse } from './advance-panchang-api';
import { MonthlyPanchangApiResponse } from './monthly-panchang-api';

export interface RootState {
  advancePanchangApiData: AdvancePanchangApiState;
  monthlyPanchangApiData: MonthlyPanchangApiState;
  realm: RealmState;
}

// To be used in reducer
export interface AdvancePanchangApiState {
  advancePanchagApiData?: AdvancePanchangApiResponse;
  error?: Error;
}

export interface MonthlyPanchangApiState {
  monthlyPanchangApiData?: { [key: string]: MonthlyPanchangApiResponse };
  error?: Error;
}

export interface RealmState {
  realm?: Realm;
}
