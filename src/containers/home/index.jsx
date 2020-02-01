import React, { useEffect } from 'react';
import ListFeedPost from './localfeed/ListFeedPost'
import DeckRestaurantAlerts from './localfeed/DeckRestaurantAlerts'
import { Container } from 'reactstrap';

/**
 * @type {React.FC}
 */



const Home = () => {
  

    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      console.log(latitude,longitude,accuracy)
      // alert("Latitude: "+latitude+"\nLongitude: "+longitude+"\nAccuracy: "+accuracy)
    }
  
    function error() {
      alert("Unable to retrieve your location")
    }
  
    
  
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
    } 
    else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  },[]);
  
  return (
    <Container>
      <DeckRestaurantAlerts/>
      <ListFeedPost/>
    </Container>
  );
};

export default Home;
