import React from "react";
import ListFeedPost from "./ListFeedPost";
import DeckRestaurantAlerts from "./DeckRestaurantAlerts";
import DeckCheckpointAlerts from '../Checkpoint/DeckCheckpointAlerts'
import { Container} from "reactstrap";
import Navbar from '../../components/Navbar'
/**
 * @type {React.FC}
 */

const Home = () => {

  return (
    <Container>
      <Navbar/>
      <DeckRestaurantAlerts />
      <DeckCheckpointAlerts/>
      <ListFeedPost />
    </Container>
  );
};

export default Home;
