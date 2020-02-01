import React from 'react';
import { Row, Col } from 'reactstrap';
import RestaurantAlerts from './RestaurantAlerts';



const DeckRestaurantAlerts = () => {

    let restaurantAlerts = [ {distance:"7km",quantity:"16kg", lat: 19.2, lng: 72.88, placeName:"Tea Villa"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 56.33, placeName:"Mcd"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 12.33, placeName:"Dominos"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 90.33, placeName:"The J"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 30.33, placeName:"Junos"}]
    let checkPointAlerts = [ {distance:"3km",quantity:"21kg", lat: 59.95, lng: 12.33, placeName:"Dominos"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 90.33, placeName:"The J"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 30.33, placeName:"Junos"}]
    
    return (
        <>
        <h4 style={{margin:"1rem"}}>Restaurant Donation</h4>  
        <Row className="mx-auto">
            {
                restaurantAlerts.map((value, index)=>
                    <Col xs="auto"  style={{ margin:"1rem"}}>
                        <RestaurantAlerts details={value}/>
                    </Col>
                )
            }        
        </Row>
        
        <h4 style={{margin:"1rem"}}>CheckPoint Donation</h4>  
        <Row className="mx-auto">
            {
                checkPointAlerts.map((value, index)=>
                    <Col xs="auto"  style={{ margin:"1rem"}}>
                        <RestaurantAlerts details={value}/>
                    </Col>
                )
            }        
        </Row>
        
        </>
    );
}
 
export default DeckRestaurantAlerts;