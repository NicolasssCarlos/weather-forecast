import { useState, useCallback, useEffect } from 'react';
import type { WeatherData, Units } from './types/weather';
import { fetchWeather } from './lib/weatherApi';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { WeatherCard } from './components/WeatherCard';
import { ErrorMessage } from './components/ErrorMessage';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [units, setUnits] = useState<Units>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const [lastCity, setLastCity] = useState('');

  const isNight = weather?.iconCode.endsWith('n') ?? false;

  useEffect(() => {
    document.body.dataset.night = String(isNight);
  }, [isNight]);

  const search = useCallback(async (city: string, currentUnits: Units) => {
    setStatus('loading');
    setErrorMsg('');
    setErrorCode(undefined);
    try {
      const data = await fetchWeather(city, currentUnits);
      setWeather(data);
      setLastCity(city);
      setStatus('success');
    } catch (err) {
      const e = err as Error & { statusCode?: number };
      setErrorMsg(e.message);
      setErrorCode(e.statusCode);
      setStatus('error');
    }
  }, []);

  function handleSearch(city: string) {
    search(city, units);
  }

  function handleUnitChange(newUnits: Units) {
    setUnits(newUnits);
    if (lastCity) {
      search(lastCity, newUnits);
    }
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Weather Forecast</h1>
          <p className="app-subtitle">Real-time weather for any city in the world</p>
        </header>

        <div className="controls">
          <SearchBar onSearch={handleSearch} loading={status === 'loading'} />
          <UnitToggle units={units} onChange={handleUnitChange} disabled={status === 'loading'} />
        </div>

        <div className="content">
          {status === 'idle' && (
            <div className="idle-state">
              <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
                <circle cx="22" cy="30" r="14" fill="currentColor" opacity="0.15" />
                <circle cx="22" cy="30" r="14" stroke="currentColor" strokeWidth="2" />
                <path d="M16 44h36a8 8 0 0 0 0-16H50a14 14 0 1 0-12.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p>Enter a city name to get started</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="loading-state">
              <div className="loading-ring" />
              <p>Fetching weather data...</p>
            </div>
          )}

          {status === 'error' && (
            <ErrorMessage message={errorMsg} statusCode={errorCode} />
          )}

          {status === 'success' && weather && (
            <WeatherCard data={weather} units={units} />
          )}
        </div>
      </div>
    </div>
  );
}
