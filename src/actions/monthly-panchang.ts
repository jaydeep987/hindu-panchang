import { Dispatch } from 'redux';

import { MonthlyPanchangApiActionTypes } from '../common/action-contants';
import {
  MonthlyPanchangApiDataAction,
  MonthlyPanchangApiErrorAction,
  MutliMonthPanchangFetchAction,
} from '../interface/actions';
import { MonthlyPanchangApiResponse } from '../interface/monthly-panchang-api';
import { requestData } from '../utils/api-utils';
import { ErrorLogger } from '../utils/error-logger';

/**
 * Fetches monthly panchang
 */
export function fetchMonthlyPanchangData(reqParams: MonthlyPanchangRequestParams):
  (dispatch: Dispatch) => Promise<void> {

  const apiEndpoint: string = 'monthly_panchang';

  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const data: MonthlyPanchangApiResponse =
        await requestData<MonthlyPanchangRequestParams, MonthlyPanchangApiResponse>(apiEndpoint, reqParams)
        .then((response: MonthlyPanchangApiResponse | undefined) => response as MonthlyPanchangApiResponse);
      dispatch(fetchMonthPanchangData(data));
    } catch (err) {
      ErrorLogger.error({
        msg: err,
        details: {
          type: ErrorLogger.API_ERROR,
          requestUrl: apiEndpoint,
        },
      });
      dispatch(fetchMonthPanchangApiError(err));
    }
  };
}

/**
 * Fetches multiple month panchang data
 * Will try to fetch given month + prev month + next month data, along with given month's advance data
 *
 * @param reqParams Request params
 */
export function fetchMultiMonthPanchangData(reqParams: MonthlyPanchangRequestParams): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch): void => {
    dispatch({
      type: MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_FETCH_MULTI,
      reqParams,
    });
  };
}

/**
 * Gives action type and data
 * @param data monthly panchang data
 */
export function fetchMonthPanchangData(data: MonthlyPanchangApiResponse): MonthlyPanchangApiDataAction {
  return {
    type: MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_DATA,
    monthlyPanchangApiData: data,
  };
}

/**
 * Gives action type and error
 * @param error error received from api
 */
export function fetchMonthPanchangApiError(error: Error): MonthlyPanchangApiErrorAction {
  return {
    type: MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_ERROR,
    error,
  };
}

export interface MonthlyPanchangRequestParams {
  month: number;
  year: number;
  lat: number;
  lon: number;
  tzone: number;
}
