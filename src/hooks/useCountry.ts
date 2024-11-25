import { useQuery } from '@apollo/client';
import { GET_COUNTRY_DETAILS } from '../graphql/queries';
import { Country, GraphQLCountryDetailsData } from '../types/Country';

export const useCountry = (code: string | undefined) => {
  const { data, loading, error } = useQuery<GraphQLCountryDetailsData>(
    GET_COUNTRY_DETAILS,
    {
      variables: { code },
      skip: !code,
    }
  );

  const transformedCountry: Country | null = data?.country
    ? {
        name: data.country.name,
        capital: data.country.capital || '',
        region: data.country.region || '',
        flag: data.country.flag || '',
        languages: data.country.languages,
        currencies: data.country.currencies,
        population: data.country.population || 0,
        borders: data.country.borders || [],
        timezones: data.country.timezones || [],
        area: data.country.area,
        alpha3Code: data.country.alpha3Code,
      }
    : null;

  return { country: transformedCountry, loading, error };
};
