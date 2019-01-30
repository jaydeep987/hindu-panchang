import { Epic, ofType } from 'redux-observable';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
  MonthlyPanchangRequestParams,
  fetchMonthPanchangApiError,
  fetchMonthPanchangData,
} from '../actions/monthly-panchang';
import { MonthlyPanchangApiActionTypes } from '../common/action-contants';
import {
  MonthlyPanchangApiDataAction,
  MonthlyPanchangApiErrorAction,
  MutliMonthPanchangFetchAction,
} from '../interface/actions';
import { MonthlyPanchangApiResponse } from '../interface/monthly-panchang-api';
import { requestData } from '../utils/api-utils';

const apiEndpoint: string = 'monthly_panchang';

export const fetchMultiMonthlyPanchang: Epic =
  (action: Observable<MutliMonthPanchangFetchAction>):
    Observable<MonthlyPanchangApiDataAction | MonthlyPanchangApiErrorAction> =>
  action
    .pipe(
      ofType(MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_FETCH_MULTI),
      mergeMap((comingAction: MutliMonthPanchangFetchAction) => {
        const { reqParams } = comingAction;
        const prevDate: Date = new Date(reqParams.year, reqParams.month - 2, 1); // tslint:disable-line:no-magic-numbers
        const nextDate: Date = new Date(reqParams.year, reqParams.month, 1);
        const apis: Array<Promise<MonthlyPanchangApiResponse | undefined>> =
          [
            // current month
            requestData<MonthlyPanchangRequestParams, MonthlyPanchangApiResponse>(apiEndpoint, reqParams),
            // prev month
            requestData<MonthlyPanchangRequestParams, MonthlyPanchangApiResponse>(apiEndpoint, {
              ...reqParams,
              year: prevDate.getFullYear(),
              month: prevDate.getMonth() + 1,
            }),
            // next month
            requestData<MonthlyPanchangRequestParams, MonthlyPanchangApiResponse>(apiEndpoint, {
              ...reqParams,
              year: nextDate.getFullYear(),
              month: nextDate.getMonth() + 1,
            }),
          ];

        return from(apis)
                .pipe(
                  mergeMap((promise: Promise<MonthlyPanchangApiResponse | undefined>) =>
                    promise
                      .then((data: MonthlyPanchangApiResponse | undefined) =>
                        fetchMonthPanchangData(data as MonthlyPanchangApiResponse))
                      .catch(fetchMonthPanchangApiError),
                  ),
                );
        }),
      );
