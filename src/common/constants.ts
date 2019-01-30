/**
 * Constants for i18n namespaces
 */
export const I18NNamespaces: {[K in I18NNamespacesType]: string} = {
  COMMON: 'common',
  MONTHS_SHORT: 'months-short',
  YEAR_SELECTION: 'year-selection',
  LABELS: 'labels',
  HINDU_MAAH: 'hinduMaah',
  PAKSH: 'paksh',
  NAKSHATRA: 'nakshatra',
};

/** Set debug mode on when developing. Turn this off in PROD. */
export const DEBUG: boolean = true;

/**
 * Months constants
 */
export enum Months {
  JAN,
  FEB,
  MAR,
  APR,
  MAY,
  JUNE,
  JULY,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
}

/** Total months in a year */
export const MONTHS_IN_YEAR: number = 12;
/** Years range, number of years back and forth of current year */
export const YEARS_RANGE: number = 50;
/** Height of calendar */
export const CALENDAR_HEIGHT: number = 400;
/** Number of past months to show from current month */
export const PAST_SCROLL_MONTHS: number = YEARS_RANGE * MONTHS_IN_YEAR;
/** Number of future months to show from current month */
export const FUTURE_SCROLL_MONTHS: number = YEARS_RANGE * MONTHS_IN_YEAR;

/** Constants for locale names */
export enum Locales {
  GUJARATI = 'gu',
  HINDI = 'hi',
  ENGLISH = 'en',
}

/** Constants for locations and their abbreviations */
export enum Locations {
  ANDHRA_PRADESH = 'AP',
  GOA = 'GA',
  GUJARAT = 'GUJ',
  KARNATAK = 'KA',
  MAHARASHTRA = 'MH',
  BIHAR = 'BR',
  CHHATTISGARH = 'CG',
  DELHI = 'DL',
  HARIYANA = 'HR',
  HIMACHAL_PRADESH = 'HP',
  JAMMU = 'JK_JMU',
  KASHMIR = 'JK_KAS',
  JHARKHAND = 'JH',
  MADHYA_PRADESH = 'MP',
  PUNJAB = 'PB',
  UTTARAKHAND = 'UK',
  UTTAR_PRADESH = 'UP',
  ASSAM = 'AS',
  KERALA = 'KL',
  ORISSA = 'OR',
  TAMILNADU = 'TN',
  TRIPURA = 'TR',
  WEST_BENGAL = 'WB',
}

type I18NNamespacesType =
  'COMMON' |
  'MONTHS_SHORT' |
  'YEAR_SELECTION' |
  'LABELS' |
  'HINDU_MAAH' |
  'PAKSH' |
  'NAKSHATRA';
