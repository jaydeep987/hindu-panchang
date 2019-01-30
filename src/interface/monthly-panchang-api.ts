export interface MonthlyPanchangApiResponse {
  year: number;
  month: number;
  panchang: MonthlyPanchang[];
}

export interface MonthlyPanchang {
  day: number;
  tithi: number;
  nak: number;
  sunrise: number;
  sunSetTime: number;
}
