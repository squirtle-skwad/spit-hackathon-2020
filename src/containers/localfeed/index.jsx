import React from "react";
import ListFeedPost from "./ListFeedPost";
import DeckRestaurantAlerts from "./DeckRestaurantAlerts";
import DeckCheckpointAlerts from '../Checkpoint/DeckCheckpointAlerts'
import { Container} from "reactstrap";
/**
 * @type {React.FC}
 */

const Home = () => {

  return (
    <>
    <Container>
      <DeckRestaurantAlerts />
      <DeckCheckpointAlerts/>
      <ListFeedPost />
    </Container>
    </>
  );
};

export default Home;
