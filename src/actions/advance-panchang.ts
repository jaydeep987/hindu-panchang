import { Dispatch } from 'redux';

import { AdvancePanchangApiActionTypes } from '../common/action-contants';
import { AdvancePanchangApiDataAction, AdvancePanchangApiErrorAction } from '../interface/actions';
import { AdvancePanchangApiResponse } from '../interface/advance-panchang-api';

/**
 * Fetchs advance panchang api data
 * @param reqParams Request params
 */
export function fetchAdvancePanchangApiData(reqParams: AdvancePanchangApiRequestParams):
  (dispatch: Dispatch) => void {
  return (dispatch: Dispatch): void => {
    dispatch({
      type: AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_FETCH,
      reqParams,
    });
  };
}

/**
 * Gives action type and data
 * @param data api data
 */
export function fetchAdvancePanchangApiDataOk(data: AdvancePanchangApiResponse): AdvancePanchangApiDataAction {
  return {
    type: AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_DATA,
    advancePanchagApiData: data,
  };
}

/**
 * Gives action type and error
 * @param error error received from api
 */
export function fetchAdvancePanchangApiDataError(error: Error): AdvancePanchangApiErrorAction {
  return {
    type: AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_ERROR,
    error,
  };
}

export interface AdvancePanchangApiRequestParams {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}
