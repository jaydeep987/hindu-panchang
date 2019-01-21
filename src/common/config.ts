import { DEBUG, Locales, Locations } from './constants';

/**
 * Provide config for app
 */
export const config: {[key: string]: string | {}} = {
  /** Api base url */
  apiBase: DEBUG ? 'http://localhost:8008/panchang_api/' : 'https://json.astrologyapi.com/v1/',
  /** Default api time out */
  apiTimeout: 5000,
  /** In case of some errors, log those errors to this email address(es) */
  errorLogEmail: ['jaydeep253a@gmail.com'],
  /** Default settings of app */
  defaultSettings: {
    language: Locales.HINDI,
    location: Locations.GUJARAT,
  },
};
