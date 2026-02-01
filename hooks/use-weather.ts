"use client";

import { useState, useEffect } from "react";

export interface WeatherState {
  temp: number | null;
  weatherCode: number | null;
  loading: boolean;
  error: string | null;
}

// Open-Meteo WMO weather code → short label
function weatherLabel(code: number): string {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95 && code <= 99) return "Thunder";
  return "—";
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    temp: null,
    weatherCode: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator?.geolocation) {
      setState((s) => ({ ...s, loading: false, error: "Geolocation not supported" }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
          );
          if (!res.ok) throw new Error("Weather fetch failed");
          const data = await res.json();
          const current = data?.current;
          setState({
            temp: current?.temperature_2m ?? null,
            weatherCode: current?.weather_code ?? null,
            loading: false,
            error: null,
          });
        } catch (e) {
          setState((s) => ({
            ...s,
            loading: false,
            error: "Could not load weather",
          }));
        }
      },
      () => {
        setState((s) => ({ ...s, loading: false, error: "Location denied" }));
      }
    );
  }, []);

  return {
    ...state,
    label: state.weatherCode != null ? weatherLabel(state.weatherCode) : "—",
  };
}
