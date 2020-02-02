import React, { useState } from "react";
import {
  Card,
  CardText,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import SelectorMap from '../../components/SelectorMap';
import { getUserDetails } from "../../helpers/auth";
import * as queries from "../../graphql/queries/index";
import LoadingPopup from "../../components/Loader/LoadingPopup";

const CheckpointCreate = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const user = getUserDetails();
  const history = useHistory();
  const [loc, setLoc] = useState({});

  const createCheckpoint = postMutation => {
    const start_time = new Date(startDate + "T" + startTime + ":00");
    const end_time = new Date(endDate + "T" + endTime + ":00");
    const variables = {
      start_time: start_time.toISOString(),
      end_time: end_time.toISOString(),
      latitude: loc.lat,
      longitude: loc.lng,
      accuracy: 1,
      user_id: user.id
    };
    postMutation({ variables }).then(resp => {
      history.push("checkpoint");
    });
  };

  return (
    <>
      <Card
        style={{
          width: "70%",
          align: "centre",
          padding: "2%",
          marginTop: "4%"
        }}
        className="card border-success mb-3 rounded mx-auto"
      >
        <CardText>
          <Form>
            <Row>
              <SelectorMap onChange={setLoc} />
              {loc.lat} {loc.lng}
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Time</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    onChange={e => setStartDate(e.target.value)}
                  />
                  <Label for="startTime">Start Time</Label>
                  <Input
                    type="time"
                    name="startTime"
                    id="startTime"
                    onChange={e => setStartTime(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Time</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    onChange={e => setEndDate(e.target.value)}
                  />
                  <Label for="endTime">End Time</Label>
                  <Input
                    type="time"
                    name="endTime"
                    id="endTime"
                    onChange={e => setEndTime(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Mutation mutation={queries.CREATE_CHECKPOINT}>
              {(postMutation, { loading, error }) => {
                if (loading) {
                  return <LoadingPopup isLoading />;
                }
                if (error) {
                  return error;
                }
                return (
                  <Button
                    type="submit"
                    onClick={() => createCheckpoint(postMutation)}
                  >
                    Create Checkpoint
                  </Button>
                );
              }}
            </Mutation>
          </Form>
        </CardText>
      </Card>
    </>
  );
};

export default CheckpointCreate;
