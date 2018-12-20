import { TranslationFunction } from 'i18next';

import { DropdownData } from '../interface/general';

import { I18NNamespaces, Months } from './constants';

/**
 * Dropdown data for months dropdown in header of home
 */
export function getDropdownMonthsData(tranlsate: TranslationFunction): DropdownData[] {
  let index: number;
  let monthKey: string;
  const data: DropdownData[] = [];
  const NUM_MONTHS: number = 12;

  for (index = 0; index < NUM_MONTHS; index++) {
    monthKey = Months[index].toLocaleLowerCase();
    data.push({
      value: monthKey,
      label: tranlsate(`${I18NNamespaces.MONTHS_SHORT}:${monthKey}`),
    });
  }

  return data;
}
