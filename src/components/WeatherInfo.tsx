import React from 'react';
import { useWeather } from '../hooks/useWeather';

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const { weather, loading, error } = useWeather(city);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weather) return <p>Weather data not available.</p>;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className='mt-4 p-4 border rounded-xl bg-blue-100 flex items-center gap-4'>
      <img
        src={iconUrl}
        alt={weather.weather[0].description}
        className='w-16 h-16'
      />
      <div>
        <h3 className='text-lg font-bold'>Weather in {city}</h3>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
