import React from 'react';
import { useFilter } from '../hooks/useFilter';

interface FilterSortBarProps {
  filters: { region: string; language: string };
  setFilters: (filters: { region: string; language: string }) => void;
  sortBy: 'name' | 'population' | 'area';
  setSortBy: (sortBy: 'name' | 'population' | 'area') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const { regions, languages, loading, error } = useFilter();

  if (error) return <p>Error loading filters: {error.message}</p>;

  const handleFilterChange = (key: 'region' | 'language', value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 mb-4'>
      <div className='flex flex-col w-full gap-2 p-4 border-2 rounded-xl md:w-1/2'>
        <h2 className='flex justify-center font-bold text-xl'>Filtering</h2>
        {loading ? (
          <p>Loading filters...</p>
        ) : (
          <div className='flex flex-col gap-4'>
            <div className='flex grow items-center gap-2'>
              <label htmlFor='region'>Region:</label>
              <select
                id='region'
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className='flex grow p-2 border border-gray-300 rounded-xl'
              >
                <option value=''>All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex grow items-center gap-2'>
              <label htmlFor='language'>Language:</label>
              <select
                id='language'
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className='flex grow p-2 border border-gray-300 rounded-xl'
              >
                <option value=''>All Languages</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col w-full gap-2 p-4 border-2 rounded-xl md:w-1/2'>
        <h2 className='flex justify-center font-bold text-xl'>Sorting</h2>
        <div className='flex flex-col gap-4'>
          <div className='flex grow items-center gap-2'>
            <label htmlFor='property'>By:</label>
            <select
              id='property'
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'name' | 'population' | 'area')
              }
              className='flex grow p-2 border border-gray-300 rounded-xl'
            >
              <option value='name'>Name</option>
              <option value='population'>Population</option>
              <option value='area'>Area</option>
            </select>
          </div>
          <div className='flex grow items-center gap-2'>
            <label htmlFor='order'>Order:</label>
            <select
              id='order'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className='flex grow p-2 border border-gray-300 rounded-xl'
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
