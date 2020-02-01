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
import VolunteerTrack from './containers/volunteer_track/VolunteerTrack';


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

        <Route exact path='/donation/:id' >
          <Navbar/>
          <RestaurantVolunteerPage/>
        </Route>

        <Route exact path="/donation/request">
          <Navbar />
          <DonationRequest />
        </Route>

        <Route exact path="/restaurant/tracker">
          <Navbar />
          <DonationTracker />
        </Route>
        <Route exact path="/checkpoint">
          <Navbar />
          <Checkpoint />
        </Route>
        <Route exact path="/donation_request">
          <Navbar />
          <RestaurantDonationNearby />
        </Route>
        
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup">
          
          <SignUpPageDetails/>
        </Route>
        <Route exact path="/signup/selection">
          <SignUpPageSelection/>
        </Route>

        <Route exact path="/volunteer/tracker">
          <VolunteerTrack/>
        </Route>

        <Route exact path="/checkpoints/">
          Checkpoints nearby
        </Route>
      </main>
    </AppProviders>
  );
};

export default App;
