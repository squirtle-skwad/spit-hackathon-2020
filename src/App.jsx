import React from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './containers/home';
import Login from './containers/Login/Login';
import SignUpPageDetails from './containers/SignUp/SignUpPageDetails';
import SignUpPageSelection from './containers/SignUp/SignUpPageSelection';

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
        <Route path="/">
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/signup"><SignUpPageDetails/></Route>
        <Route exact path="/signup2"><SignUpPageSelection/></Route>
      </main>
    </AppProviders>
  );
};

export default App;
