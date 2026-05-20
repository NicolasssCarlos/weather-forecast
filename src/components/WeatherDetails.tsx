import type { Units } from '../types/weather';

interface WeatherDetailsProps {
  feelsLike: number;
  humidity: number;
  units: Units;
}

export function WeatherDetails({ feelsLike, humidity, units }: WeatherDetailsProps) {
  const unitSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-details">
      <div className="detail-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
        <div>
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(feelsLike)}{unitSymbol}</span>
        </div>
      </div>
      <div className="detail-card">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <div>
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
      </div>
    </div>
  );
}
