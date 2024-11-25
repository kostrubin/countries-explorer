import React, { useEffect } from 'react';
import WeatherInfo from './WeatherInfo';
import { Country } from '../types/Country';

interface CountryModalProps {
  country: Country;
  onClose: () => void;
  getCountryName: (code: string) => string | null;
}

const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
  getCountryName,
}) => {
  useEffect(() => {
    const disableScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', disableScroll, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  const languages = country.languages.edges.map((edge) => edge.node.name);
  const currencies = country.currencies.edges.map((edge) => edge.node.name);
  const neighbours = country.borders
    .map((code) => getCountryName(code))
    .filter((name) => name !== null);

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-xl max-w-lg w-full relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl'
        >
          &times;
        </button>

        <div className='flex justify-center mb-4 '>
          <img
            src={country.flag}
            alt={`${country.name} Flag`}
            className='w-1/2 h-auto rounded-xl shadow-xl'
          />
        </div>

        <h1 className='text-center text-2xl font-bold mb-4'>{country.name}</h1>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <div>
          <strong>Languages:</strong> {languages.join(', ')}
        </div>
        <div>
          <strong>Currencies:</strong> {currencies.join(', ')}
        </div>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Area:</strong> {country.area?.toLocaleString()} km
          <span className='align-super text-xs'>²</span>
        </p>
        <div>
          <strong>Timezones:</strong> {country.timezones.join(', ')}
        </div>
        <div>
          <strong>Neighbours:</strong>{' '}
          {neighbours.length > 0 ? neighbours.join(', ') : 'No data'}
        </div>

        <div className='mt-4'>
          <WeatherInfo city={country.capital} />
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
