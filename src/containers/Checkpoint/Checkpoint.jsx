import React from 'react'
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'
import { Query } from 'react-apollo';


const Checkpoint = () =>{
    const state = useGeolocation();
    var dateobj = new Date();
    var dateobjISO = dateobj.toISOString();

    const rad2degree = (value) =>{
        return value *  180 / Math.PI 
    }


    const variable = {
        // minlatitude: state.latitude -  rad2degree(3/6415),
        // maxlatitude: state.latitude +  rad2degree(3/6415),
        // maxlongitude: state.latitude + rad2degree(3/6415),
        // minlongitude: state.latitude - rad2degree(3/6415),
        endtime : dateobjISO
    }

    return (
    <>
        <Query query={queries.LIST_CHECKPOINT} variables={variable}>{
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
                                    data.checkpoint.map((checkpoint) => {
                                       return( 
                                       <ListGroupItem> 
                                            {checkpoint.start_time}
                                            <br/>
                                            {checkpoint.end_time}
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

export default Checkpoint;