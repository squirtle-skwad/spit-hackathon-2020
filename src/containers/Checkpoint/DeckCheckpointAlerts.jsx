import React from 'react'
import { Query } from 'react-apollo';
import { Row, Col, ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useGeolocation } from 'react-use';
import * as queries from '../../graphql/queries/index'
import CheckpointAlerts from './CheckpointAlerts';
import {distance} from '../../helpers/distance';

const DeckCheckpointAlerts = () =>{
    const state = useGeolocation();
    const date  = Date.now()
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
        end_time:dateobjISO  // To check that the current time is less than the expiration time
    }

    return (
        <>
            <Query query={queries.CHECKPOINT_ALERT} variables={variables}>{
                        ({loading,error,data}) => {
                            if(loading){
                                return <Spinner/>
                            }
                            if(error){
                                alert (error)
                            }
                            
                            if(data){
                                return (
                                    <>
                                    {/* {console.log(data.donation_request)} */}
                                    <h4 style={{margin:"1rem"}}>Checkpoint Alerts</h4>  
                                    <Row className="mx-auto">
                                        {
                                            data.checkpoint.map((value)=>
                                                <Col xs="auto"  style={{ margin:"1rem"}}>
                                                    <CheckpointAlerts distance={distance(value.latitude,value.longitude,state.latitude,state.longitude)}
                                                    lat={value.latitude} lng={value.longitude} start_time={value.start_time} end_time={value.end_time}/>
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
 
export default DeckCheckpointAlerts;