import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries($after: String, $first: Int) {
    countries(after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          alpha3Code
          capital
          region
          flag
          languages {
            edges {
              node {
                name
              }
            }
          }
          currencies {
            edges {
              node {
                name
              }
            }
          }
          population
          area
          borders
          timezones
        }
      }
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      capital
      region
      flag
      languages {
        edges {
          node {
            name
          }
        }
      }
      currencies {
        edges {
          node {
            name
          }
        }
      }
      population
      borders
      timezones
    }
  }
`;

export const GET_FILTER_VALUES = gql`
  query GetFilterValues {
    countries {
      edges {
        node {
          region
          languages {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;
