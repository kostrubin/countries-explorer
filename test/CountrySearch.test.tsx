import { render, screen, fireEvent, act } from '@testing-library/react';
import CountrySearch from '../src/components/CountrySearch';
import { DEFAULT_DEBOUNCE_TIMEOUT } from '../src/constants';

jest.useFakeTimers();

test('updates query state and calls onSearch with debounce, including reset', () => {
  const mockOnSearch = jest.fn();
  render(<CountrySearch onSearch={mockOnSearch} />);

  const inputElement = screen.getByPlaceholderText(
    /type at least 3 characters to search a country.../i
  );

  fireEvent.change(inputElement, { target: { value: 'It' } });
  act(() => jest.advanceTimersByTime(DEFAULT_DEBOUNCE_TIMEOUT));
  expect(mockOnSearch).toHaveBeenCalledWith('');
  expect(mockOnSearch).toHaveBeenCalledTimes(1);

  fireEvent.change(inputElement, { target: { value: 'Ita' } });
  act(() => jest.advanceTimersByTime(DEFAULT_DEBOUNCE_TIMEOUT));
  expect(mockOnSearch).toHaveBeenCalledWith('Ita');
  expect(mockOnSearch).toHaveBeenCalledTimes(2);

  fireEvent.change(inputElement, { target: { value: '' } });
  act(() => jest.advanceTimersByTime(DEFAULT_DEBOUNCE_TIMEOUT));
  expect(mockOnSearch).toHaveBeenCalledWith('');
  expect(mockOnSearch).toHaveBeenCalledTimes(3);
});
