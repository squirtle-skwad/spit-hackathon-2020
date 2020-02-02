import React from "react";
import { Query } from "react-apollo";
import { Row, Col, Spinner } from "reactstrap";
import { useGeolocation } from "react-use";
import * as queries from "../../graphql/queries/index";
import RestaurantAlerts from "./RestaurantAlerts";
import { distance } from "../../helpers/distance";

const DeckRestaurantAlerts = () => {
  const state = useGeolocation();
  var dateobjISO = new Date().toISOString();

  const variables = {
    delivery_by_time: dateobjISO, // To check that the current time is less than the expiration time
  };

  return (
    <>
      <Query query={queries.DONATION_ALERT} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          
          if (error) {
            alert(error);
          }

          if (data) {
            // donation_alert.push(...data.donation_request)
            // donation_alert.sort(function(left,right){
            //     return (left.delivery_by_time).diff(date)
            // });
            return (
              <>
                <h4 style={{ margin: "1rem" }}>Donation Alerts</h4>
                <Row className="mx-auto">
                  {data.donation_request.map(value => (
                    <Col xs="auto" style={{ margin: "1rem" }}>
                      <RestaurantAlerts
                        distance={distance(
                          value.latitude,
                          value.longitude,
                          state.latitude,
                          state.longitude,
                        )}
                        quantity={value.quantity}
                        lat={value.latitude}
                        lng={value.longitude}
                        placeName={value.donor.name}
                        donationRequestId={value.id}
                        slum={value.slum_area.name}
                        deliverTime = {value.delivery_by_time}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            );
          }
        }}
      </Query>
    </>
  );
};

export default DeckRestaurantAlerts;
