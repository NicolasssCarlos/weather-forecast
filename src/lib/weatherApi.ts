/// <reference types="vite/client" />
import type { Units, WeatherData } from '../types/weather';

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/weather-proxy`;

export async function fetchWeather(city: string, units: Units): Promise<WeatherData> {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ city, units }),
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message ?? 'Unknown error') as Error & { statusCode: number };
    err.statusCode = res.status;
    throw err;
  }

  return data as WeatherData;
}
