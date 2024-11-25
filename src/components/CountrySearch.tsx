import React, { useState } from 'react';

interface CountrySearchProps {
  onSearch: (query: string) => void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className='mb-4'>
      <input
        type='text'
        placeholder='Search for a country...'
        value={query}
        onChange={handleInputChange}
        className='w-full p-5 border border-gray-300 rounded-xl'
      />
    </div>
  );
};

export default CountrySearch;
