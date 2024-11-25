import { useQuery } from '@apollo/client';
import { GET_FILTER_VALUES } from '../graphql/queries';

interface Language {
  node: {
    name: string;
  };
}

interface CountryNode {
  region: string;
  languages: {
    edges: Language[];
  };
}

interface CountriesResponse {
  countries: {
    edges: {
      node: CountryNode;
    }[];
  };
}

export const useFilter = () => {
  const { data, loading, error } =
    useQuery<CountriesResponse>(GET_FILTER_VALUES);

  const regions = Array.from(
    new Set(
      data?.countries.edges
        .map((edge) => edge.node.region)
        .filter((region) => !!region)
        .sort()
    )
  );

  const languages = Array.from(
    new Set(
      data?.countries.edges
        .flatMap((edge) =>
          edge.node.languages.edges.map((lang) => lang.node.name)
        )
        .filter((lang) => !!lang)
        .sort()
    )
  );

  return { regions, languages, loading, error };
};
