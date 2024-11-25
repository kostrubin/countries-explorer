import React, { useState } from 'react';
import CountryList from '../components/CountryList';
import CountrySearch from '../components/CountrySearch';
import FilterSortBar from '../components/FilterSortBar';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<{ region: string; language: string }>({
    region: '',
    language: '',
  });
  const [sortBy, setSortBy] = useState<'name' | 'population' | 'area'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <div className='flex flex-col gap-4 p-6'>
      <img src="/public/earth-icon.svg" alt="Logo" className='size-20 m-auto' />
      <h1 className='text-center font-bold text-4xl mb-6'>
        Countries Explorer
      </h1>
      <CountrySearch onSearch={setSearchQuery} />
      <FilterSortBar
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <CountryList
        searchQuery={searchQuery}
        filters={filters}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default Home;
