import React from 'react';
import PropTypes from 'prop-types';

import { Modal, ModalBody } from 'reactstrap';
import Spinner from './Spinner';

function LoadingPopup(props) {
    return (
        <Modal isOpen={props.isOpen || true}>
            <ModalBody>
                <Spinner />
            </ModalBody>
        </Modal>
    );
}

LoadingPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default LoadingPopup;
