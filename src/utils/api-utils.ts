import Axios, { AxiosResponse } from 'axios';

import { config } from '../common/config';

/**
 * Requests api with given params and returns promise
 * @param reqParams Request params
 */
export function requestData<P, R>(url: string, reqParams?: P): Promise<R | AxiosResponse<R>> {
  return Axios({
    baseURL: config.apiBase as string,
    url,
    params: reqParams,
    timeout: config.apiTimeout as number,
  })
  .then((data: AxiosResponse<R>) => {
    console.log('status', data.status);
    if (data.status) {
      return data.data;
    } else {
      return data;
    }
  })
  .catch((reason: {}) => {
    console.log(reason);
    throw reason;
  });
}
