import { AdvancePanchangApiResponse } from './advance-panchang-api';

export interface RootState {
  advancePanchangApiData: AdvancePanchangeApiState;
  realm: RealmState;
}

// To be used in reducer
export interface AdvancePanchangeApiState {
  advancePanchagApiData?: AdvancePanchangApiResponse;
  error?: Error;
}

export interface RealmState {
  realm?: Realm;
}
