import { AdvancePanchangApiResponse } from './advance-panchang-api';

export interface RootState {
  advancePanchangApiData: AdvancePanchangeApiState;
}

// To be used in reducer
export interface AdvancePanchangeApiState {
  advancePanchagApiData?: AdvancePanchangApiResponse;
  error?: Error;
}
