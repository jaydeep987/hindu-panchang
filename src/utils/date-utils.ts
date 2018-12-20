import { TranslationFunction } from 'i18next';
import { isString, padStart } from 'lodash';

import { I18NNamespaces, Months } from '../common/constants';

// tslint:disable:no-magic-numbers newline-per-chained-call

const MONTHS_EN: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ACCEPTED_FORMATS: RegExp = /(YYYY|YY|MMM|MM|M|DD|D|dd|d|A|a|HH|H|hh|h|mm|m|ss|s|X|x|u|c)/g;

const replaceTokenFunctions: ReplaceTokenFunctions = {
  YYYY: (date: Date): number => date.getFullYear(),
  YY: (date: Date): string => String(date.getFullYear()).substring(2),
  MMM: (date: Date, translate?: TranslationFunction): string => {
    if (translate) {
      return translate(`${I18NNamespaces.MONTHS_SHORT}:${Months[date.getMonth()]}`);
    }

    // return default english month
    return MONTHS_EN[date.getMonth()];
  },
  MM: (date: Date): string => padStart(`${date.getMonth() + 1}`, 2, '0'),
  M: (date: Date): number => date.getMonth() + 1,
  DD: (date: Date): string => padStart(`${date.getDate()}`, 2, '0'),
  D: (date: Date): number => date.getDate(),
  d: (date: Date): number => date.getDay(),
  A: (date: Date): string => (date.getHours() < 12 ? 'AM' : 'PM'),
  a: (date: Date): string => (date.getHours() < 12 ? 'am' : 'pm'),
  HH: (date: Date): string => padStart(`${date.getHours()}`, 2, '0'),
  H: (date: Date): number => date.getHours(),
  hh: (date: Date): string => padStart(String(date.getHours() % 12), 2, '0'),
  h: (date: Date): number => date.getHours() % 12,
  mm: (date: Date): string => padStart(`${date.getMinutes()}`, 2, '0'),
  m: (date: Date): number => date.getMinutes(),
  ss: (date: Date): string => padStart(`${date.getSeconds()}`, 2, '0'),
  s: (date: Date): number => date.getSeconds(),
  X: (date: Date): number => (date.getTime() / 1000) | 0, // tslint:disable-line:no-bitwise
  x: (date: Date): number => date.getTime(),
};

/**
 * Formate the date in given format.
 *
 * @param date Date to format
 * @param format valid format
 * @param translate translation function
 */
export function formatDate(date: Date, format: string, translate?: TranslationFunction): string {
  if (!format || !isString(format)) {
    return format;
  }

  return format.replace(ACCEPTED_FORMATS, (match: string, token: string) =>
    String(replaceTokenFunctions[token](date, translate)));
}

export const Formats: {[K in FormatsType]: string} = {
  YYYY: 'YYYY',
  YY: 'YY',
  MMM: 'MMM',
  MM: 'MM',
  M: 'M',
  DD: 'DD',
  D: 'D',
  d: 'd',
  A: 'A',
  a: 'a',
  HH: 'HH',
  H: 'H',
  hh: 'hh',
  h: 'h',
  mm: 'mm',
  m: 'm',
  ss: 'ss',
  s: 's',
  X: 'X',
  x: 'x',
};

interface ReplaceTokenFunctions {
  [key: string]: (date: Date, translate?: TranslationFunction) => string | number;
}

type FormatsType = 'YYYY' | 'YY' | 'MMM' | 'MM' |
  'M' |
  'DD' |
  'D' |
  'd' |
  'A' |
  'a' |
  'HH' |
  'H' |
  'hh' |
  'h' |
  'mm' |
  'm' |
  'ss' |
  's' |
  'X' |
  'x';
