import { calendarNames } from '../utils/vedik-utils';

export const calendarName: {[K in calendarNames]: string} = {
   amanta: 'amanta',
   purnimanta: 'purnimanta',
   solar: 'solar',
 };

export const hinduMaahMappings: {[key: string]: string} = {
  Chaitra: 'chaitra',
  Vaisakha : 'vaisakh',
  Jyaistha : 'jeth',
  Asadha: 'asadh',
  Shravana : 'shravan',
  Bhadra: 'bhadarvo',
  Asvina: 'aso',
  Kartika: 'kartik',
  Mrigshira: 'magsar',
  Pausa: 'pos',
  Magha: 'maha',
  Phalguna: 'phagan',
};

export const pakshaMappings: {[key: string]: string} = {
  'Shukla-Paksha': 'shukl',
  'Krishna-Paksha': 'krishn',
};

export enum Nakshatra {
  ASHVINI,
  BHARANI,
  KRUTIKA,
  ROHINI,
  MRIGSHIRSH,
  ARDR,
  PUNARVASU,
  PUSHY,
  ASHLESH,
  MAGHA,
  PURV_PHALGUNI,
  UTTAR_PHALGUNI,
  HAST,
  CHITR,
  SVATI,
  VISHAKHA,
  ANURADHA,
  JYESHTA,
  MUL,
  PURVASHADHA,
  UTTARASHADHA,
  SHRAVAN,
  SHRAVISHTA,
  SHATBHISHAK,
  PURV_BHADRAPADA,
  UTTAR_BHADRAPADA,
  REVATI,
}
