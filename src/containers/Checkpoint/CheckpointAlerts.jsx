import React, { useState } from 'react';
import SimpleMap from "../localfeed/TestGoogleMap";
import CountDownClock from "../localfeed/CountDownClock";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './CheckpointAlerts.css';

const CheckpointAlerts = (props) => {
    const { lat, lng, distance, end_time, start_time } = props
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (
        <>
            <Button outline color="secondary" id="storyButton" className="rounded-circle text-center" onClick={toggle}>{distance}km</Button>
            <div>
                <Modal centered isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Checkpoint</ModalHeader>
                    <ModalBody>
                        <SimpleMap lat={lat} lng={lng} placeName="Checkpoint" />
                        <h4>Checkpoint Location: {lat + " " + lng}</h4>
                        <h4>Start Time: {start_time}</h4>
                        <h4>End Time: {end_time}</h4>
                        {/* <CountDownClock expireTime={(Date.now() - 1580463085058) / 1000} /> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}


export default CheckpointAlerts;