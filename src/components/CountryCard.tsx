import React from 'react';
import { Country } from '../types/Country';

const CountryCard: React.FC<{
  country: Country;
  onClick: () => void;
}> = ({ country, onClick }) => {
  const languages = country.languages.edges.map((edge) => edge.node.name);

  return (
    <div
      onClick={onClick}
      className='flex flex-col justify-between gap-2 p-4 border rounded-xl shadow-xl bg-blue-50 cursor-pointer hover:bg-blue-100'
    >
      <img src={country.flag} className='mx-auto w-1/2 rounded-xl shadow-xl' />
      <h3 className='flex justify-center text-lg font-bold mt-2'>
        {country.name}
      </h3>
      <div className='flex flex-col gap-1'>
        <p>
          <strong>Capital:</strong> {country.capital || 'No data'}
        </p>
        <p>
          <strong>Region:</strong> {country.region || 'No data'}
        </p>
        <p>
          <strong>Population:</strong>{' '}
          {country.population ? country.population.toLocaleString() : 'No data'}
        </p>
        <p>
          <strong>Area:</strong>{' '}
          {country.area ? country.area.toLocaleString() : 'No data'}
        </p>
        <p>
          <strong>Languages:</strong>{' '}
          {languages.length > 0 ? languages.join(', ') : 'No data'}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
