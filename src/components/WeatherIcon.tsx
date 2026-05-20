interface WeatherIconProps {
  iconCode: string;
  description: string;
  size?: number;
}

export function WeatherIcon({ iconCode, description, size = 100 }: WeatherIconProps) {
  return (
    <img
      className="weather-icon"
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt={description}
      width={size}
      height={size}
    />
  );
}
