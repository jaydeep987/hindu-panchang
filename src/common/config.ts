import { DEBUG } from './constants';

export const config: {[key: string]: string | {}} = {
  apiBase: DEBUG ? 'http://localhost:8008/panchang_api/' : 'https://json.astrologyapi.com/v1/',
  apiTimeout: 5000,
  errorLogEmail: ['jaydeep253a@gmail.com'],
};
