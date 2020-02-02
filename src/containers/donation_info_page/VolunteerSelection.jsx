import React, { useState } from "react";
import {
  Card,
  CardTitle,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  Button,
  Container,
  CardImg
} from "reactstrap";
import VolunteerSelector from "./VolunteerSelector";
import { Mutation, useApolloClient } from "react-apollo";
import * as queries from "../../graphql/queries/index";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { useParams, useHistory } from "react-router-dom";
import { getUserDetails } from "../../helpers/auth";
import { useGeolocation } from "react-use";
import loving from "../../assets/images/loving.png";

const VolunteerSelection = props => {
  let { donationRequestId } = useParams();
  let user = getUserDetails();
  const cardStyle = { margin: "2rem", color: "#ff9500" };
  const cardStyleActive = { margin: "2rem", border: "2px solid green" };
  const [volunteer, setVolunteer] = useState(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const client = useApolloClient();
  const state = useGeolocation();
  const routeHistory = useHistory();
  //TODO: Add an image for instead of CardTitle and put the text in button

  const [role, setRole] = useState(0);

  const role_mapper = {
    1: "distributor",
    2: "transporter",
    3: "both"
  };

  const updateRole = roleId => {
    setRole(roleId);
    setStartTime("");
    setEndTime("");
    setVolunteer(null);
  };

  const onVolunteerSubmit = postMutation => {
    const donationVolunteer = {
      donationRequestId: donationRequestId,
      volunteerId: user.id,
      startTime: startTime,
      endTime: endTime,
      role: role_mapper[role]
    };
    if (volunteer !== null) {
      donationVolunteer["assigned"] = true;
      postMutation({ variables: donationVolunteer }).then(resp => {
        client
          .mutate({
            mutation: queries.INSERT_DONATION_CHAIN,
            variables: {
              state: 0,
              donationVolunteerId:
                resp.data.insert_donation_volunteer.returning[0].id,
              longitude: state.longitude,
              latitude: state.latitude,
              accuracy: state.accuracy
            }
          })
          .then(resp => {
            console.log(resp);
            client
              .mutate({
                mutation: queries.UPDATE_DONATION_VOLUNTEER,
                variables: {
                  donationRequestId: donationRequestId,
                  volunteerId: volunteer.volunteer.id
                }
              })
              .then(resp => {
                client
                  .mutate({
                    mutation: queries.INSERT_DONATION_CHAIN,
                    variables: {
                      state: 0,
                      donationVolunteerId:
                        resp.data.update_donation_volunteer.returning[0].id,
                      longitude: state.longitude,
                      latitude: state.latitude,
                      accuracy: state.accuracy
                    }
                  })
                  .then(resp => {
                    console.log(resp);
                    client
                      .mutate({
                        mutation: queries.UPDATE_DONATION_VOLUNTEER,
                        variables: {
                          donationRequestId: donationRequestId,
                          volunteerId: volunteer.volunteer.id
                        }
                      })
                      .then(resp => {
                        client
                          .mutate({
                            mutation: queries.UPDATE_IS_ASSIGNED,
                            variables: {
                              donationRequestId: donationRequestId
                            }
                          })
                          .then(resp => {
                            routeHistory.push("/tracker/" + donationRequestId);
                          });
                      });
                  });
              });
          });
      });
    } else if (role === 3) {
      donationVolunteer["assigned"] = true;
      postMutation({ variables: donationVolunteer }).then(resp => {
        console.log(resp);
        client
          .mutate({
            mutation: queries.INSERT_DONATION_CHAIN,
            variables: {
              state: 0,
              donationVolunteerId:
                resp.data.insert_donation_volunteer.returning[0].id,
              longitude: state.longitude,
              latitude: state.latitude,
              accuracy: state.accuracy
            }
          })
          .then(resp => {
            client
              .mutate({
                mutation: queries.UPDATE_IS_ASSIGNED,
                variables: {
                  donationRequestId: donationRequestId
                }
              })
              .then(resp => {
                routeHistory.push("/tracker/" + donationRequestId);
              });
          });
      });
    } else {
      donationVolunteer["assigned"] = false;
      postMutation({ variables: donationVolunteer }).then(resp => {
        console.log(resp);
        alert("Not assigned");
      });
    }
  };
  return (
    <>
      {role === 1 ? (
        <>
          <Card
            style={{ margin: "2rem", background: "#241501" }}
            className="shadow"
            body
            inverse
          >
            <Row>
              <Col sm="2">
                <CardImg
                  src={loving}
                  style={{ width: "6rem", height: "6rem", marginLeft: "2rem" }}
                />
              </Col>
              <Col sm="10">
                <CardTitle>Volunteer As A Picker And Distributer</CardTitle>
                <Button color="primary" onClick={() => updateRole(1)}>
                  Volunteer
                </Button>
              </Col>
            </Row>
          </Card>
          <VolunteerSelector
            onChange={setVolunteer}
            onStartTime={setStartTime}
            onEndTime={setEndTime}
            value={volunteer}
            role={"transporter"}
            donationRequestId={donationRequestId}
          />
        </>
      ) : (
        <Card
          style={{ margin: "2rem", background: "#241501" }}
          className="shadow"
          body
          inverse
        >
          <Row>
            <Col sm="2">
              <CardImg
                src={loving}
                style={{ width: "6rem", height: "6rem", marginLeft: "2rem" }}
              />
            </Col>
            <Col sm="10">
              <CardTitle>Volunteer As A Picker And Distributer</CardTitle>
              <Button color="primary" onClick={() => updateRole(1)}>
                Volunteer
              </Button>
            </Col>
          </Row>
        </Card>
      )}
      {role === 2 ? (
        <>
          <Card
            style={cardStyleActive}
            className="shadow"
            body
            inverse
            color="warning"
          >
            <CardTitle>Volunteer As A Transporter</CardTitle>
            <Button color="secondary" onClick={() => updateRole(2)}>
              Volunteer
            </Button>
          </Card>
          <VolunteerSelector
            onChange={setVolunteer}
            onStartTime={setStartTime}
            onEndTime={setEndTime}
            value={volunteer}
            role={"distributor"}
            donationRequestId={donationRequestId}
          />
        </>
      ) : (
        <Card style={cardStyle} className="shadow" body inverse color="warning">
          <CardTitle>Volunteer As A Transporter</CardTitle>
          <Button color="secondary" onClick={() => updateRole(2)}>
            Volunteer
          </Button>
        </Card>
      )}
      {role === 3 ? (
        <Card
          style={cardStyleActive}
          className="shadow"
          body
          inverse
          color="primary"
        >
          <CardTitle>Volunteer As Both</CardTitle>
          <Button color="secondary" onClick={() => updateRole(3)}>
            Volunteer
          </Button>
        </Card>
      ) : (
        <Card style={cardStyle} className="shadow" body inverse color="primary">
          <CardTitle>Volunteer As Both</CardTitle>
          <Button color="secondary" onClick={() => updateRole(3)}>
            Volunteer
          </Button>
        </Card>
      )}
      <Container>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="startTime">Start Time</Label>
                <Input
                  type="time"
                  name="startTime"
                  id="startTime"
                  required
                  value={startTime}
                  onChange={curr => setStartTime(curr.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="endTime">End Time</Label>
                <Input
                  type="time"
                  name="endTime"
                  id="endTime"
                  required
                  value={endTime}
                  onChange={curr => setEndTime(curr.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Mutation mutation={queries.INSERT_DONATION_VOLUNTEER}>
            {(postMutation, { loading, error }) => {
              if (loading) {
                return <LoadingPopup />;
              }
              if (error) {
                alert(error);
                return null;
              }
              return (
                <Button
                  color="success"
                  onClick={() => onVolunteerSubmit(postMutation)}
                >
                  Submit
                </Button>
              );
            }}
          </Mutation>
        </Form>
      </Container>
    </>
  );
};

export default VolunteerSelection;
