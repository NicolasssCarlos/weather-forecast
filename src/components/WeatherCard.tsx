import type { WeatherData, Units } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { WeatherDetails } from './WeatherDetails';

interface WeatherCardProps {
  data: WeatherData;
  units: Units;
}

export function WeatherCard({ data, units }: WeatherCardProps) {
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  const description =
    data.description.charAt(0).toUpperCase() + data.description.slice(1);

  return (
    <div className="weather-card">
      <div className="card-location">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{data.cityName}, {data.country}</span>
      </div>

      <div className="card-main">
        <WeatherIcon iconCode={data.iconCode} description={data.description} size={120} />
        <div className="card-temp">
          <span className="temp-value">{Math.round(data.temp)}</span>
          <span className="temp-unit">{unitSymbol}</span>
        </div>
      </div>

      <p className="card-description">{description}</p>

      <WeatherDetails feelsLike={data.feelsLike} humidity={data.humidity} units={units} />
    </div>
  );
}
