import React from 'react'
import { Query } from 'react-apollo';
import { Row, Col, ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'
import RestaurantAlerts from './RestaurantAlerts';
import {distance} from '../../helpers/distance';

const DeckRestaurantAlerts = () =>{
    const state = useGeolocation();
    const date  = Date.now()
    var dateobj = new Date();
    var dateobjISO = dateobj.toISOString();
    const donation_alert = []
    
    const rad2degree = (value) =>{
        return value *  180 / Math.PI 
    }


    const variables = {
        minlatitude: state.latitude -  rad2degree(3/6415),
        maxlatitude: state.latitude +  rad2degree(3/6415),
        maxlongitude: state.latitude + rad2degree(3/6415),
        minlongitude: state.latitude - rad2degree(3/6415),
        delivery_by_time:dateobjISO  // To check that the current time is less than the expiration time
    }

    return (
        <>
            <Query query={queries.DONATION_ALERT} variables={variables}>{
                        ({loading,error,data}) => {
                            if(loading){
                                return <Spinner/>
                            }
                            if(error){
                                alert (error)
                            }
                            
                            if(data){
                                donation_alert = JSON.parse(JSON.stringify(data.donation_request)) 
                                donation_alert.sort(function(left,right){
                                    return (left.delivery_by_time).diff(date)
                                });
                                return (
                                    
                                    <>
                                    {console.log(data.donation_request)}
                                    <h4 style={{margin:"1rem"}}>Donation Alerts</h4>  
                                    <Row className="mx-auto">
                                        {
                                    
                                            donation_alert.map((value)=>
                                                <Col xs="auto"  style={{ margin:"1rem"}}>
                                                    <RestaurantAlerts distance={distance(value.latitude,value.longitude,state.latitude,state.longitude)}
                                                        quantity={value.quantity}/>
                                                </Col>
                                            )
                                        }        
                                    </Row>
                                    </>
                                );
    
                            }
                        }
    
                     }
            </Query>
        </>
        )
}



// const DeckRestaurantAlerts = () => {

//     let restaurantAlerts = [ {distance:"7km",quantity:"16kg", lat: 19.2, lng: 72.88, placeName:"Tea Villa"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 56.33, placeName:"Mcd"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 12.33, placeName:"Dominos"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 90.33, placeName:"The J"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 30.33, placeName:"Junos"}]
//     let checkPointAlerts = [ {distance:"3km",quantity:"21kg", lat: 59.95, lng: 12.33, placeName:"Dominos"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 90.33, placeName:"The J"}, {distance:"3km",quantity:"21kg", lat: 59.95, lng: 30.33, placeName:"Junos"}]
    
//     return (
//         <>
//         <h4 style={{margin:"1rem"}}>Donation Alerts</h4>  
//         <Row className="mx-auto">
//             {
//                 restaurantAlerts.map((value, index)=>
//                     <Col xs="auto"  style={{ margin:"1rem"}}>
//                         <RestaurantAlerts details={value}/>
//                     </Col>
//                 )
//             }        
//         </Row>
//         </>
//     );
// }
 
export default DeckRestaurantAlerts;