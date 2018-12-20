export interface AdvancePanchangApiResponse {
  day: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  tithi: PanchangTithi;
  nakshatra: PanchangNakshatra;
  yog: PanchangYog;
  karan: PanchangKaran;
  hindu_maah: PanchangMaah;
  paksha: string;
  ritu: string;
  sun_sign: string;
  moon_sign: string;
  ayana: string;
  panchang_yog: string;
  vikram_samvat: number;
  shaka_samvat: number;
  shaka_samvat_name: string;
  vkram_samvat_name: string;
  disha_shool: string;
  disha_shool_remedies: string[];
  nak_shool: string;
  moon_nivas: string;
  abhijit_muhurta: StartEndTime;
  rahukaal: StartEndTime;
  guliKaal: StartEndTime;
  yamghant_kaal: StartEndTime;
}

interface PanchangTithi {
  details: TithiDetails;
  end_time: EndTime;
}

interface TithiDetails {
  tithi_number: number;
  tithi_name: string;
  special: string;
  summary: string;
  deity: string;
}

interface EndTime {
  hour: number;
  minute: number;
  second: number;
}

interface PanchangNakshatra {
  details: NakshatraDetails;
  end_time: EndTime;
}

interface NakshatraDetails {
  nak_number: number;
  nak_name: string;
  ruler: string;
  deity: string;
  special: string;
  summary: string;
}

interface PanchangYog {
  details: YogDetails;
  end_time: EndTime;
}

interface YogDetails {
  yog_number: number;
  yog_name: string;
  special: string;
  meaning: string;
}

interface PanchangKaran {
  details: KaranDetails;
  end_time: EndTime;
}

interface KaranDetails {
  karan_number: number;
  karan_name: string;
  special: string;
  deity: string;
}

interface PanchangMaah {
  adhik_status: boolean;
  purnimanta: string;
  amanta: string;
}

interface StartEndTime {
  start: string;
  end: string;
}
