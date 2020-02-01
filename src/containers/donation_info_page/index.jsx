import React from "react";
import VolunteerSelection from "./VolunteerSelection";

import { useParams } from "react-router-dom";

const RestaurantVolunteerPage = props => {
  let { id } = useParams();
  return (
    
      
          <VolunteerSelection />
    
  );
};

export default RestaurantVolunteerPage;
