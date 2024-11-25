import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql.country/graphql',
  cache: new InMemoryCache(),
});

export default client;
