import React, { useState } from "react";
import VolunteerSelection from "./VolunteerSelection";
import VolunteerSelector from './VolunteerSelector'

import { useParams } from "react-router-dom";

const RestaurantVolunteerPage = props => {
  const [volunteer, setVolunteer] = useState();
  let { id } = useParams();

  return (

    <>
      <VolunteerSelection />
      {/* <VolunteerSelector onChange={setVolunteer} value={volunteer} /> */}
      
    </>

  );
};

export default RestaurantVolunteerPage;
