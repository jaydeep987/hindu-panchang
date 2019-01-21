import Axios, { AxiosResponse } from 'axios';

import { config } from '../common/config';

import { ErrorLogger } from './error-logger';

/**
 * Requests api with given params and returns promise
 * @param reqParams Request params
 */
export function requestData<P, R>(url: string, reqParams?: P): Promise<R | undefined> {
  const STATUS_OK: number = 200;
  const apiBase: string = config.apiBase as string;

  return Axios({
    baseURL: apiBase,
    url,
    params: reqParams,
    timeout: config.apiTimeout as number,
  })
  .then((data: AxiosResponse<R>) => {
    if (data.status === STATUS_OK) {
      return data.data;
    }
    ErrorLogger.error({
      msg: `API Returned non-ok status: ${data.statusText}`,
      details: {
        type: ErrorLogger.API_ERROR,
        requestUrl: `${apiBase}${url}`,
      },
    });

    return undefined;
  })
  .catch((reason: {}) => {
    console.log(reason);
    throw reason;
  });
}
