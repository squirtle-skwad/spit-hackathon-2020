// Source: https://docs.hasura.io/1.0/graphql/manual/guides/integrations/apollo-subscriptions.html

import ApolloClient from "apollo-client";

import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: `https://${process.env.REACT_APP_HASURA_ENDPOINT}`,
});

// const wsLink = new WebSocketLink({
//   uri: `wss://${process.env.REACT_APP_HASURA_ENDPOINT}`,
//   options: {
//     reconnect: true
//   },
// });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLink,
// );

// Instantiate client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client;
