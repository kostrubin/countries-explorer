import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { Country } from '../types/Country';

export const useCountries = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  const countries: Country[] =
    data?.countries.edges.map((edge: { node: Country }) => edge.node) || [];

  return { countries, loading, error };
};
