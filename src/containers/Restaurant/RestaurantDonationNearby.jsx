import React from 'react'
import { Query } from 'react-apollo';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'

const RestaurantDonationNearby = () =>{
    var dateobjISO = new Date().toISOString();
    console.log(dateobjISO)

    const variables = {
        delivery_by_time:dateobjISO  // To check that the current time is less than the expiration time
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
