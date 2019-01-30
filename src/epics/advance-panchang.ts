import { Epic, ofType } from 'redux-observable';
import { Observable, from, merge } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
  AdvancePanchangApiRequestParams,
  fetchAdvancePanchangApiDataError,
  fetchAdvancePanchangApiDataOk,
} from '../actions/advance-panchang';
import { AdvancePanchangApiActionTypes } from '../common/action-contants';
import {
  AdvancePanchangApiDataAction,
  AdvancePanchangApiErrorAction,
  AdvancePanchangApiFetchAction,
} from '../interface/actions';
import { AdvancePanchangApiResponse } from '../interface/advance-panchang-api';
import { requestData } from '../utils/api-utils';
import { ErrorLogger } from '../utils/error-logger';

const apiEndpoint: string = 'advanced_panchang';

export const advancePanchangEpic: Epic =
  (action: Observable<AdvancePanchangApiFetchAction>):
  Observable<AdvancePanchangApiDataAction | AdvancePanchangApiErrorAction> =>
  action.pipe(
    ofType(AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_FETCH),
    mergeMap((comingAction: AdvancePanchangApiFetchAction) => {
      const apiPromise: Array<Promise<AdvancePanchangApiResponse | undefined>> = [
        requestData<AdvancePanchangApiRequestParams, AdvancePanchangApiResponse>(apiEndpoint, comingAction.reqParams),
      ];

      return from(apiPromise)
              .pipe(
                mergeMap((response: Promise<AdvancePanchangApiResponse | undefined>) =>
                  response
                    .then((data: AdvancePanchangApiResponse | undefined) =>
                      fetchAdvancePanchangApiDataOk(data as AdvancePanchangApiResponse))
                    .catch((error: Error | string) => {
                      ErrorLogger.error({
                        msg: typeof error === 'string' ? error : error.message,
                        details: {
                          type: ErrorLogger.API_ERROR,
                          requestUrl: apiEndpoint,
                        },
                      });

                      return fetchAdvancePanchangApiDataError(error as Error);
                    }),
                ),
              );
    }),
  );
