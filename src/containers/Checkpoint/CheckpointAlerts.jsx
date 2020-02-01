import React, { useState } from 'react';
import SimpleMap from "../localfeed/TestGoogleMap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';

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
                    <ModalHeader toggle={toggle} cssModule={{'modal-title': 'w-100 text-center'}}>Checkpoint</ModalHeader>
                    <ModalBody>
                        <SimpleMap lat={lat} lng={lng} placeName="Checkpoint"/>
                        <h4><Badge color="primary" dark style={{marginRight:"1rem"}}>Start Date</Badge>{start_time.substring(0,10)}</h4>
                        <h4><Badge color="secondary" light style={{marginRight:"1rem"}}>Start Time</Badge>{start_time.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}</h4>
                        <h4><Badge color="primary" dark style={{marginRight:"1rem"}}>End Date</Badge>{end_time.substring(0,10)}</h4>
                        <h4><Badge color="secondary" light style={{marginRight:"1rem"}}>End Time</Badge>{end_time.replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, "$1")}</h4>
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