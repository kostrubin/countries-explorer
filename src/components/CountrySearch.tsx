import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { DEFAULT_DEBOUNCE_TIMEOUT } from '../constants';

interface CountrySearchProps {
  onSearch: (query: string) => void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, DEFAULT_DEBOUNCE_TIMEOUT);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      onSearch('');
    }

    if (debouncedQuery.length >= 3) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Type at least 3 characters to search a country...'
        value={query}
        onChange={handleInputChange}
        className='w-full p-5 border border-gray-300 rounded-xl'
      />
    </div>
  );
};

export default CountrySearch;
