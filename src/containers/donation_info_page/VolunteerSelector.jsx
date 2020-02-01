import React from 'react';
import {
    Card,
    Col,
    Row,
    Container,
    Label,
} from 'reactstrap';
import cns from 'classnames';
import { Query } from 'react-apollo';
import { GET_VOLUNTEERS } from '../../graphql/queries/index';

/**
 * @type {React.FC}
 */
const VolunteerCard = ({ volunteer, onChange, selected, onStartTime, onEndTime }) => {
    const changeSelected = () => {
        onChange(volunteer);
        onStartTime(volunteer.start_time)
        onEndTime(volunteer.end_time)
    };

    return (
        <Card className={cns("my-2", { "border-primary": selected })} onClick={changeSelected}>
            <Container>
                <Row>
                    <Col xs={4} className="d-flex flex-column justify-content-center align-items-center">
                        <h3>{volunteer.start_time}</h3>
                        <h6>People</h6>
                    </Col>
                    <Col xs={8} className="d-flex justify-content-center align-items-center">
                        <h3>{volunteer.end_time}</h3>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
};

/**
 * @type {React.FC}
 */
const VolunteerSelector = ({ value, onChange, onStartTime, onEndTime, role, donationRequestId }) => {
    return (
        <Container>
            <Label>Volunteers nearby</Label>
            <Query query={GET_VOLUNTEERS} variables={{
                "role": role,
                "donationRequestId": donationRequestId
            }}>
                {({ data, loading, error }) => {
                    if (loading) {
                        return "Loading...";
                    }

                    if (error) {
                        return JSON.stringify(error);
                    }

                    return data.donation_volunteer.map((volunteer) => (
                        <VolunteerCard key={volunteer.id} volunteer={volunteer} onChange={onChange} onStartTime={onStartTime} onEndTime={onEndTime} selected={value && value.id === volunteer.id} />)
                    );
                }}
            </Query>
        </Container>
    );
};

export default VolunteerSelector;
