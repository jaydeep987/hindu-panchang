
type I18NNamespacesType = 'COMMON' | 'MONTHS_SHORT' | 'YEAR_SELECTION';

export const I18NNamespaces: {[K in I18NNamespacesType]: string} = {
  COMMON: 'common',
  MONTHS_SHORT: 'months-short',
  YEAR_SELECTION: 'year-selection',
};

export const DEBUG: boolean = true;

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

export const MONTHS_IN_YEAR: number = 12;
// Years range, number of years back and forth of current year
export const YEARS_RANGE: number = 50;
export const CALENDAR_HEIGHT: number = 400;
export const PAST_SCROLL_MONTHS: number = YEARS_RANGE * MONTHS_IN_YEAR;
export const FUTURE_SCROLL_MONTHS: number = YEARS_RANGE * MONTHS_IN_YEAR;
