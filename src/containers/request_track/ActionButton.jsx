import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { useMutation, useApolloClient } from 'react-apollo';
import { useGeolocation } from 'react-use';
import { useParams } from 'react-router-dom';
import { UPDATE_DONATION_CHAIN, FIND_DONATION_VOLUNTEER_ID } from '../../graphql/queries/chain';
import { getUserDetails } from '../../helpers/auth';

/**
 * @type {React.FC}
 */
const ActionButton = ({
  state,
  children,
}) => {
  const { id: donation_request_id } = useParams();
  const [updateChainMutation] = useMutation(UPDATE_DONATION_CHAIN);
  const user = getUserDetails();
  const location = useGeolocation();
  const client = useApolloClient();
  const [disabled, setDisabled] = useState(false);

  const execMutation = async () => {
    const { data: data1 } = await client.query({
      query: FIND_DONATION_VOLUNTEER_ID,
      variables: {
        donation_request_id,
        volunteer_id: user.id
      },
    });
    const donation_volunteer_id = data1.donation_volunteer[0].id;

    setDisabled(true);
    await updateChainMutation({
      variables: {
        accuracy: location.accuracy,
        latitude: location.latitude,
        longitude: location.longitude,
        state: state,
        donation_volunteer_id,
      },
    });
    setDisabled(false);
  };

  return (
    <Button disabled={disabled} onClick={execMutation}>ACTION {children}</Button>
  );
};

export default ActionButton;
