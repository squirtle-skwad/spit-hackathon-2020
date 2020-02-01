import React, { useMemo } from "react";
import { ListGroup, ListGroupItem, Spinner } from "reactstrap";
import * as queries from "../../graphql/queries/index";
import { Query } from "react-apollo";

const Checkpoint = () => {
  var dateobjISO = useMemo(() => new Date().toISOString(), []);

  // const rad2degree = value => {
  //   return (value * 180) / Math.PI;
  // };

  const variable = {
    endtime: dateobjISO
  };

  return (
    <>
      <Query query={queries.LIST_CHECKPOINT} variables={variable}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Spinner />;
          }
          if (error) {
            alert(error);
          }

          if (data) {
            console.log(data);
            return (
              <ListGroup>
                {data.checkpoint.map(checkpoint => {
                  return (
                    <ListGroupItem>
                      {checkpoint.start_time}
                      <br />
                      {checkpoint.end_time}
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            );
          }
        }}
      </Query>
    </>
  );
};

export default Checkpoint;
