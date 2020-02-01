import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SimpleMap from "./TestGoogleMap";
import CountDownClock from "./CountDownClock";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./RestaurantAlerts.css";

const RestaurantAlerts = (props) => {
    const { lat, lng, placeName, distance, quantity, donationRequestId } = props
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
                    <ModalHeader toggle={toggle}>{placeName}</ModalHeader>
                    <ModalBody>
                        <SimpleMap lat={lat} lng={lng} placeName={placeName} />
                        <h4>Quantity: {quantity}kg</h4>
                        <h4>Slum Location: {quantity}</h4>
                        <CountDownClock expireTime={(Date.now() - 1580463085058) / 1000} />
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
