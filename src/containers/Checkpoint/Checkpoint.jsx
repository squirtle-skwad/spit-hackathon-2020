import React, { useMemo } from "react";
import {
  Col,
  Spinner,
  CardDeck,
  Card,
  Row,
  Container,
  Badge
} from "reactstrap";
import * as queries from "../../graphql/queries/index";
import { Query } from "react-apollo";
import TestGoogleMap from "../localfeed/TestGoogleMap";

const Checkpoint = () => {
  var dateobjISO = useMemo(() => new Date().toISOString(), []);

  const variables = {
    endtime: dateobjISO
  };

  return (
    <Container>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "2rem" }}
      >
        <h3>Checkpoint Nearby</h3>
      </div>
      <Query query={queries.LIST_CHECKPOINT} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          if (error) {
            alert(error);
          }
          return (
            <CardDeck>
              {data.checkpoint.map(checkpoint => {
                return (
                  <Card
                    style={{ margin: "2rem", width: "20rem" }}
                    body
                    outline
                    color="primary"
                  >
                    <Row>
                      <Col>
                        <TestGoogleMap
                          lat={checkpoint.latitude}
                          lng={checkpoint.longitude}
                          placeName="Checkpoint"
                        />
                      </Col>
                      <Col>
                        <h4>
                          <Badge
                            color="primary"
                            dark
                            style={{ marginRight: "1rem" }}
                          >
                            Start Date
                          </Badge>
                          {checkpoint.start_time.substring(0, 10)}
                        </h4>
                        <br />
                        <h4>
                          <Badge
                            color="secondary"
                            light
                            style={{ marginRight: "1rem" }}
                          >
                            Start Time
                          </Badge>
                          {checkpoint.start_time.replace(
                            /^[^:]*([0-2]\d:[0-5]\d).*$/,
                            "$1"
                          )}
                        </h4>
                        <br />
                        <h4>
                          <Badge
                            color="primary"
                            dark
                            style={{ marginRight: "1rem" }}
                          >
                            End Date
                          </Badge>
                          {checkpoint.end_time.substring(0, 10)}
                        </h4>
                        <br />
                        <h4>
                          <Badge
                            color="secondary"
                            light
                            style={{ marginRight: "1rem" }}
                          >
                            End Time
                          </Badge>
                          {checkpoint.end_time.replace(
                            /^[^:]*([0-2]\d:[0-5]\d).*$/,
                            "$1"
                          )}
                        </h4>
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </CardDeck>
          );
        }}
      </Query>
    </Container>
  );
};
export default Checkpoint;
