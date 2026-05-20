export type Units = 'metric' | 'imperial';

export interface WeatherData {
  cityName: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  iconCode: string;
}
