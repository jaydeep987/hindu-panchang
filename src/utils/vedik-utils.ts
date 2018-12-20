import { calendarName } from '../common/api-constants';

const latLongData: {[key: string]: LocationOptions} = {
  AP: {
    long: 79.73999,
    lat: 15.9129,
  },
  GA: {
    long: 74.123993,
    lat: 15.299326,
  },
  GUJ: {
    long: 71.192383,
    lat: 22.258652,
  },
  KA: {
    long: 75.71389,
    lat: 15.317277,
  },
  MH: {
    long: 75.71389,
    lat: 19.75148,
  },

  BR: {
    lat: 25.096073,
    long: 85.313118,
  },
  CG: {
    lat: 21.278658,
    long: 81.866142,
  },
  DL: {
    lat: 28.70406,
    long: 77.102493,
  },
  HR: {
    lat: 28.830799,
    long: 78.493217,
  },
  HP: {
    lat: 31.817261,
    long: 77.302757,
  },
  JK_JMU: {
    lat: 32.726601,
    long: 74.857025,
  },
  JK_KAS: {
    lat: 33.778175,
    long: 76.576172,
  },
  JA: {
    lat: 23.610182,
    long: 85.279938,
  },
  MP: {
    lat: 23.9709,
    long: 78.420227,
  },
  PB: {
    lat: 31.147129,
    long: 75.341217,
  },
  UK: {
    lat: 30.066753,
    long: 79.019302,
  },
  UP: {
    lat: 27.139759,
    long: 80.867531,
  },

  AS: {
    lat: 26.200603,
    long: 92.937576,
  },
  KL: {
    lat: 10.850516,
    long: 76.27108,
  },
  OR: {
    lat: 20.18865,
    long: 84.440849,
  },
  TN: {
    lat: 11.127123,
    long: 78.656891,
  },
  TR: {
    lat: 23.940847,
    long: 91.988152,
  },
  WB: {
    lat: 24.38246,
    long: 87.85762,
  },
};

const regionalCalendarNames: {[key in calendarNames]: string[]} = {
  amanta: ['AP', 'GA', 'GUJ', 'KA', 'MH'],
  purnimanta: ['BR', 'CG', 'DL', 'HR', 'HP', 'JK_JMU', 'JK_KAS', 'JA', 'MP', 'PB', 'UK', 'UP'],
  solar: ['AS', 'KL', 'OR', 'TN', 'TR', 'WB'],
};

/**
 * Gives regional calendar name according to given location
 *
 * @param location name of location
 */
export function getRegionalCalendarName(location: string): string {
  if (!location) {
    return calendarName.amanta;
  }

  let calName: string = calendarName.amanta; // default amanta

  Object
    .keys(regionalCalendarNames)
    .forEach((key: string) => {
      if (regionalCalendarNames.includes(location)) {
        calName = key;
      }
    });

  return calName;
}

interface LocationOptions {
  long: number;
  lat: number;
}

export type calendarNames = 'amanta' | 'purnimanta' | 'solar';
