import { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL = `https://api.openweathermap.org/data/2.5/weather`;
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async () => {
      if (!city) {
        setError('City is not provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error fetching weather: ${response.statusText}`);
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};
