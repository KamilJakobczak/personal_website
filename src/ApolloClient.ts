import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([errorLink, new HttpLink({ uri: '/api/graphql', credentials: 'include' })]);

export const apollo_client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          booksFeed: {
            keyArgs: false,
            // merge(existing = [], incoming){
            //   return [...existing, ...incoming]
            // }
          },
          authorsFeed: {
            keyArgs: false,
          },
        },
      },
    },
  }),
  link,
});
