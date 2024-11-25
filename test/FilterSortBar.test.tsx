import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import FilterSortBar from '../src/components/FilterSortBar';
import { GET_FILTER_VALUES } from '../src/graphql/queries';

const mocks = [
  {
    request: {
      query: GET_FILTER_VALUES,
    },
    result: {
      data: {
        countries: {
          edges: [
            {
              node: {
                region: 'Europe',
                languages: { edges: [{ node: { name: 'English' } }] },
              },
            },
            {
              node: {
                region: 'Asia',
                languages: { edges: [{ node: { name: 'Japanese' } }] },
              },
            },
          ],
        },
      },
    },
  },
];

test('renders and updates filters', async () => {
  const mockSetFilters = jest.fn();
  const filters = { region: '', language: '' };

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FilterSortBar
        filters={filters}
        setFilters={mockSetFilters}
        sortBy='name'
        setSortBy={jest.fn()}
        sortOrder='asc'
        setSortOrder={jest.fn()}
      />
    </MockedProvider>
  );

  expect(screen.getByText(/loading filters/i)).not.toBeNull();

  const regionSelect = await screen.findByLabelText('Region:');
  const languageSelect = await screen.findByLabelText('Language:');

  fireEvent.change(regionSelect, { target: { value: 'Europe' } });
  fireEvent.change(languageSelect, { target: { value: 'English' } });

  expect(mockSetFilters).toHaveBeenCalledWith({
    region: 'Europe',
    language: '',
  });
  expect(mockSetFilters).toHaveBeenCalledWith({
    region: '',
    language: 'English',
  });
});
