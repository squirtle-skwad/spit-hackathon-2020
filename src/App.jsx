import React from 'react';

import { ApolloProvider } from 'react-apollo';
import client from './graphql/client';

import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './containers/Login/Login';
import SignUpPageDetails from './containers/SignUp/SignUpPageDetails';
import SignUpPageSelection from './containers/SignUp/SignUpPageSelection';
import Home from './containers/localfeed';
import RestaurantVolunteerPage from './containers/donation_info_page'
import DonationRequest from './containers/request_form';
import DonationTracker from './containers/request_track';
import Checkpoint from './containers/Checkpoint';
import RestaurantDonationNearby from './containers/Restaurant/RestaurantDonationNearby'

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

        <Route exact path="/request">
          <Navbar />
          <DonationRequest />
        </Route>

        <Route exact path="/track">
          <Navbar />
          <DonationTracker />
        </Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/signup"><SignUpPageDetails/></Route>
        <Route exact path="/signup2"><SignUpPageSelection/></Route>
        <Route exact path="/checkpoint">
          <Navbar />
          <Checkpoint />
        </Route>
        <Route exact path="/donation_request">
          <Navbar />
          <RestaurantDonationNearby />
        </Route>
      </main>
    </AppProviders>
  );
};

export default App;
