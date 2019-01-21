import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

import { AdvancePanchangApiActionTypes } from '../common/action-contants';
import { AdvancePanchangApiDataAction, AdvancePanchangApiErrorAction } from '../interface/actions';
import { AdvancePanchangApiResponse } from '../interface/advance-panchang-api';
import { requestData } from '../utils/api-utils';
import { ErrorLogger } from '../utils/error-logger';

/**
 * Fetchs advance panchang api data
 * @param reqParams Request params
 */
export function fetchAdvancePanchangApiData(reqParams: AdvancePanchangApiRequestParams):
  (dispatch: Dispatch) => Promise<void> {

  const apiEndpoint: string = 'advanced_panchang';

  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const data: AdvancePanchangApiResponse =
        await requestData<AdvancePanchangApiRequestParams, AdvancePanchangApiResponse>(apiEndpoint, reqParams)
        .then(
          (response: AdvancePanchangApiResponse | undefined) =>
            (response as AdvancePanchangApiResponse),
        );
      dispatch(fetchData(data));
    } catch (err) {
      ErrorLogger.error({
        msg: err,
        details: {
          type: ErrorLogger.API_ERROR,
          requestUrl: apiEndpoint,
        },
      });
      dispatch(apiError(err));
    }
  };
}

/**
 * Gives action type and data
 * @param data api data
 */
function fetchData(data: AdvancePanchangApiResponse): AdvancePanchangApiDataAction {
  return {
    type: AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_DATA,
    advancePanchagApiData: data,
  };
}

/**
 * Gives action type and error
 * @param error error received from api
 */
function apiError(error: Error): AdvancePanchangApiErrorAction {
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
