import React from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/home';
import RestaurantVolunteerPage from './containers/home/localfeed/RestaurantVolunteerPage'


/**
 * @type {React.FC}
 */
const AppProviders = ({ children }) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </ApolloProvider>
);

/**
 * @type {React.FC}
 */
const App = () => {
  return (
    <AppProviders>
      <main className="App">
      <Route exact path="/">
          <Navbar />
          <Home />
        </Route>

      <Route exact path='/restaurant_volunteer/:id' >
        <Navbar/>
        <RestaurantVolunteerPage/>
      </Route>

      </main>
    </AppProviders>
  );
};

export default App;
