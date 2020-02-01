import React from 'react'
import { Query } from 'react-apollo';
import { Row, Col, ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'
import RestaurantAlerts from './RestaurantAlerts';
import {distance} from '../../helpers/distance';
import LoadingPopup from '../../components/Loader/LoadingPopup';

const DeckRestaurantAlerts = () =>{
    const state = useGeolocation();
    var dateobj = new Date();
    var dateobjISO = dateobj.toISOString();
    
    const rad2degree = (value) =>{
        return value *  180 / Math.PI 
    }


    const variables = {
        // minlatitude: state.latitude -  rad2degree(3/6415),
        // maxlatitude: state.latitude +  rad2degree(3/6415),
        // maxlongitude: state.latitude + rad2degree(3/6415),
        // minlongitude: state.latitude - rad2degree(3/6415),
        delivery_by_time:dateobjISO  // To check that the current time is less than the expiration time
    }

    return (
        <>
            <Query query={queries.DONATION_ALERT} variables={variables}>{
                        ({loading,error,data}) => {
                            if(loading){
                                return <LoadingPopup/>
                            }
                            if(error){
                                alert (error)
                            }
                            
                            if(data){
                                // donation_alert.push(...data.donation_request)
                                // donation_alert.sort(function(left,right){
                                //     return (left.delivery_by_time).diff(date)
                                // });
                                return (
                                    
                                    <>
                                    {console.log(data.donation_request)}
                                    <h4 style={{margin:"1rem"}}>Donation Alerts</h4>  
                                    <Row className="mx-auto">
                                        {
                                    
                                            data.donation_request.map((value)=>
                                                <Col xs="auto"  style={{ margin:"1rem"}}>
                                                    <RestaurantAlerts distance={distance(value.latitude,value.longitude,state.latitude,state.longitude)}
                                                        quantity={value.quantity} lat={value.latitude} lng={value.longitude} deliverTime={new Date(value.delivery_by_time)}
                                                        placeName={value.donor.name} donationRequestId = {value.id} slum={value.slum_area.name} />
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
 
export default DeckRestaurantAlerts;