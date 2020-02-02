import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Badge} from 'reactstrap'
import SimpleMap from "./TestGoogleMap";
import CountDownClock from "./CountDownClock";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./RestaurantAlerts.css";

const RestaurantAlerts = (props) => {
    const { lat, lng, placeName, distance, quantity, donationRequestId, deliverTime, slum } = props
    const routeHistory = useHistory()
    const redirectVolunteerFeed = (e) => {
        routeHistory.push('donation/'+donationRequestId)
    }
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <>
            <Button outline color="secondary" id="storyButton" className="rounded-circle text-center" onClick={toggle}>{distance}km<br />{quantity}kg</Button>
            <div>
                <Modal centered isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}>{placeName}</ModalHeader>
                    <ModalBody>
                        <SimpleMap lat={lat} lng={lng} placeName={placeName} />
                        <h4><Badge color="secondary" light style={{marginRight:"1rem"}}>Quantity</Badge> {quantity}kg</h4>
                        <h4><Badge color="primary" dark style={{marginRight:"1rem"}}>Slum</Badge>{slum}</h4>
                        {/* <CountDownClock expireTime={(deliverTime-Date.now()) / 1000} /> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>redirectVolunteerFeed()}>Volunteer</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}

export default RestaurantAlerts;
