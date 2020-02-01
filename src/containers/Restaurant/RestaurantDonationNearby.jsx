import React, { useState } from 'react'
import { Query } from 'react-apollo';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'

const RestaurantDonationNearby = () =>{
    const [loading, setLoading] = useState(true)
    const earthrad = 6415 
    const state = useGeolocation();
    var dateobj = new Date();
    var dateobjISO = dateobj.toISOString();

    const rad2degree = (value) =>{
        return value *  180 / Math.PI 
    }


    const variables = {
        minlatitude: state.latitude -  rad2degree(3/6415),
        maxlatitude: state.latitude +  rad2degree(3/6415),
        maxlongitude: state.latitude + rad2degree(3/6415),
        minlongitude: state.latitude - rad2degree(3/6415),
        delivery_by_time:dateobjISO
    }

    return (
        <>
            <Query query={queries.DONATION_REQUEST} variables={variables}>{
                        ({loading,error,data}) => {
                            if(loading){
                                return <Spinner/>
                            }
                            if(error){
                                alert (error)
                            }
                            
                            if(data){
                                console.log(data)
                                return(
                                    <ListGroup>{
                                        data.donation_request.map((donation) => {
                                           return( 
                                           <ListGroupItem> 
                                                {donation.quantity}
                                                {donation.slum_area.name}
                                                {donation.donor.name}
                                            </ListGroupItem>
                                           )
                                        })
                                    }
                                    </ListGroup>
    
                                )
    
                            }
                        }
    
                     }
            </Query>
        </>
        )
}
export default RestaurantDonationNearby;
