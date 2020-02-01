import React from 'react';
import { Button} from 'reactstrap';
import { useHistory } from 'react-router-dom';

import './RestaurantAlerts.css'

const RestaurantAlerts = (props) => {
    const { distance, quantity } = props.details
    const routeHistory = useHistory()
    const redirectVolunteerFeed = (e) =>{
        routeHistory.push('restaurant_volunteer/2')
    }   
    
    
    return (
    <>
        <Button outline color="secondary" id="storyButton" className="rounded-circle text-center" onClick={redirectVolunteerFeed}>{distance}<br/>{quantity}</Button>
    
    </>
    );
}  

 
export default RestaurantAlerts;