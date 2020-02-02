import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
  Col,
  Card,
  CardText,
  CardDeck,
  CardColumns
} from "reactstrap";
import { Query } from "react-apollo";
import { Award } from 'react-feather';

import LoadingPopup from "../../components/Loader/LoadingPopup";
import * as queries from "../../graphql/queries/index";
import { getUserDetails } from "../../helpers/auth";
import { useHistory } from "react-router-dom";
import TestGoogleMap from "./TestGoogleMap";

const Example = props => {
  const userId = getUserDetails().id;
  const userName = getUserDetails().name;
  const userRole = getUserDetails().type.typeName;
  let currentRank = false;
  const routeHistory = useHistory();

  const getLeaderBoard = data => {
    const role_weights = {
      transporter: 0.5,
      distributor: 0.5,
      both: 1
    };

    let leaderBoard = {};
    data.forEach((value, index) => {
      if (value.volunteer.id + " " + value.volunteer.name in leaderBoard) {
        leaderBoard[value.volunteer.id + " " + value.volunteer.name] +=
          value.donation_request.quantity * role_weights[value.role];
      } else {
        leaderBoard[value.volunteer.id + " " + value.volunteer.name] =
          value.donation_request.quantity * role_weights[value.role];
      }
    });
    console.log(leaderBoard);
    let leaderBoardList = [];
    Object.keys(leaderBoard).forEach(function(key) {
      leaderBoardList.push([key, leaderBoard[key]]);
    });
    leaderBoardList.sort(function(a, b) {
      return b[1] - a[1];
    });
    return leaderBoardList;
  };

  const getCurrentRank = data => {
    data.forEach((val, index) => {
      if (userId === val[0].split(" ")[0] && index > 9) {
        currentRank = [index + 1, val[1]];
      }
    });
  };

  const onCardClick = donationRequestId => {
    routeHistory.push("/tracker/" + donationRequestId);
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "2rem" }}
      >
        <h3>{userName}</h3>
      </div>
      {userRole === "volunteer" ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "2rem" }}
          >
            <h4><Award />LeaderBoard</h4>
          </div>
          <Query query={queries.GET_SCORES}>
            {({ data, loading, error }) => {
              if (loading) {
                return <LoadingPopup />;
              }
              if (error) {
                return null;
              }
              if (data) {
                console.log(data.donation_volunteer);
                const leaderBoard = getLeaderBoard(data.donation_volunteer);
                getCurrentRank(leaderBoard);
                console.log(leaderBoard);
                console.log(userId);
                return (
                  <>
                    <ListGroup style={{ padding: "2rem" }} className="shadow">
                      {leaderBoard.map((value, index) =>
                        value[0].split(" ")[0] === userId ? (
                          <ListGroupItem
                            active
                            className="justify-content-between"
                          >
                            <Row>
                              <Col>
                                <Badge pill>{index + 1}</Badge>
                              </Col>
                              <Col>{value[0].split(" ")[1]}</Col>
                              <Col>{value[1]}</Col>
                            </Row>
                          </ListGroupItem>
                        ) : (
                          <ListGroupItem className="justify-content-between">
                            <Row>
                              <Col>
                                <Badge pill>{index + 1}</Badge>
                              </Col>
                              <Col>{value[0].split(" ")[1]}</Col>
                              <Col>{value[1]}</Col>
                            </Row>
                          </ListGroupItem>
                        )
                      )}
                    </ListGroup>

                    {currentRank ? (
                      <ListGroupItem
                        className="justify-content-between"
                        style={{ margin: "2rem" }}
                      >
                        <Row>
                          <Col>
                            <Badge pill>{currentRank[0]}</Badge>
                          </Col>
                          <Col>{userName}</Col>
                          <Col>{currentRank[1]}</Col>
                        </Row>
                      </ListGroupItem>
                    ) : null}
                  </>
                );
              }
            }}
          </Query>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "2rem" }}
          >
            <h4>Recent Social Work</h4>
          </div>
          <Query
            query={queries.GET_ACTIONS}
            variables={{ volunteerId: userId }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <LoadingPopup />;
              }
              if (error) {
                alert(error);
              }

              console.log(data);
              return (
                <>
                  <CardColumns>
                    {data.donation_volunteer.map(donation => {
                      return (
                        <Card
                          tag="a"
                          onClick={() =>
                            onCardClick(donation.donation_request_id)
                          }
                          style={{ cursor: "pointer" }}
                          body
                          outline
                          color="primary"
                        >
                          <Row>
                            <Col>
                              <TestGoogleMap
                                lat={donation.donation_request.latitude}
                                lng={donation.donation_request.longitude}
                                placeName={donation.donation_request.donor.name}
                              />
                            </Col>
                            <Col>
                              <CardText>
                                <h4 className="d-flex flex-column align-items-center justify-content-between">
                                  <Badge style={{ marginRight: "1rem" }}>
                                    Role
                                  </Badge>
                                  {donation.role}
                                  {donation.donation_request.is_assigned ? (
                                    <Badge style={{ marginRight: "1rem" }}>
                                      Assigned
                                    </Badge>
                                  ) : (
                                    <Badge
                                      style={{
                                        marginRight: "1rem",
                                        color: "success"
                                      }}
                                    >
                                      Unassigned
                                    </Badge>
                                  )}
                                </h4>
                              </CardText>
                            </Col>
                          </Row>
                        </Card>
                      );
                    })}
                  </CardColumns>
                </>
              );
            }}
          </Query>
        </>
      ) : (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "2rem" }}
          >
            <h4>Recent Donations</h4>
          </div>
          <Query
            query={queries.GET_ACTIONS}
            variables={{ volunteerId: userId }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <LoadingPopup />;
              }
              if (error) {
                alert(error);
              }

              console.log(data);
              return (
                <>
                  <CardDeck>
                    {data.donation_volunteer.map(donation => {
                      return (
                        <Card
                          tag="a"
                          onClick={() =>
                            onCardClick(donation.donation_request_id)
                          }
                          style={{ cursor: "pointer" }}
                          body
                          outline
                          color="primary"
                        >
                          <Row>
                            <Col>
                              <TestGoogleMap
                                lat={donation.donation_request.latitude}
                                lng={donation.donation_request.longitude}
                                placeName={donation.donation_request.donor.name}
                              />
                            </Col>
                            <Col>
                              <CardText>
                                <h4>
                                  {donation.assigned ? (
                                    <Badge style={{ marginRight: "1rem" }}>
                                      Assigned
                                    </Badge>
                                  ) : (
                                    <Badge
                                      style={{
                                        marginRight: "1rem",
                                        color: "success"
                                      }}
                                    >
                                      Unassigned
                                    </Badge>
                                  )}
                                </h4>
                              </CardText>
                            </Col>
                          </Row>
                        </Card>
                      );
                    })}
                  </CardDeck>
                </>
              );
            }}
          </Query>
        </>
      )}
    </>
  );
};

export default Example;
