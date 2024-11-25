import React, { useState } from 'react';
import CountryCard from './CountryCard';
import CountryModal from './CountryModal';
import { Country } from '../types/Country';
import { useCountries } from '../hooks/useCountries';

interface CountryListProps {
  searchQuery: string;
  filters: { region: string; language: string };
  sortBy: 'name' | 'population' | 'area';
  sortOrder: 'asc' | 'desc';
}

const CountryList: React.FC<CountryListProps> = ({
  searchQuery,
  filters,
  sortBy,
  sortOrder,
}) => {
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const getCountryName = (code: string): string | null => {
    const country = countries.find(
      (country: Country) => country.alpha3Code === code
    );
    return country ? country.name : null;
  };

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let filteredAndSortedCountries: Country[] = [...countries];

  if (searchQuery) {
    filteredAndSortedCountries = filteredAndSortedCountries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (filters.region) {
    filteredAndSortedCountries = filteredAndSortedCountries.filter(
      (country) => country.region === filters.region
    );
  }

  if (filters.language) {
    filteredAndSortedCountries = filteredAndSortedCountries.filter((country) =>
      country.languages.edges.some(
        (lang) => lang.node.name === filters.language
      )
    );
  }

  filteredAndSortedCountries = [...filteredAndSortedCountries].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'population') {
      comparison = b.population - a.population;
    } else if (sortBy === 'area') {
      comparison = b.area - a.area;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  if (filteredAndSortedCountries.length === 0) {
    return (
      <p className='text-lg font-semibold text-gray-700'>
        No countries found. Try adjusting your search or filters.
      </p>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredAndSortedCountries.map((country) => (
          <CountryCard
            key={country.name}
            country={country}
            onClick={() => setSelectedCountry(country)}
          />
        ))}
      </div>
      {selectedCountry && (
        <CountryModal
          getCountryName={getCountryName}
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default CountryList;
