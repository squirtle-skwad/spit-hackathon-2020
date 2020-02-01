import React from 'react';
import SimpleMap from './TestGoogleMap';
import CountDownClock from './CountDownClock';
import VolunteerSelection from './VolunteerSelection';
import { Row,Col } from 'reactstrap';
import { useParams } from 'react-router-dom'

const RestaurantVolunteerPage = (props) => {
    let { id } = useParams()
    const [lat, lng,placeName, quantity] = [59.23,30.33,"Dharavi","10kg"]
    return ( 
    <>
                <SimpleMap lat={lat} lng={lng} placeName={placeName}/>
            <Row>
                <Col>
                    <h4>Quantity: {quantity}</h4>
                    <h4>Slum Location: {quantity}</h4>
                    <CountDownClock expireTime={(Date.now()-1580463085058)/1000}/>
                </Col>
                <Col>
                    <VolunteerSelection/>
                </Col>
                                    
            </Row> 
    </>
    );
}
 
export default RestaurantVolunteerPage;