import { render, screen, fireEvent } from '@testing-library/react';
import CountrySearch from '../src/components/CountrySearch';

test('updates query state and calls onSearch on input change', () => {
  const mockOnSearch = jest.fn();
  render(<CountrySearch onSearch={mockOnSearch} />);

  const inputElement = screen.getByPlaceholderText(/search for a country/i);

  fireEvent.change(inputElement, { target: { value: 'Italy' } });

  expect((inputElement as HTMLInputElement).value).toBe('Italy');

  expect(mockOnSearch).toHaveBeenCalledTimes(1);
  expect(mockOnSearch).toHaveBeenCalledWith('Italy');
});
