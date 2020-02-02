import React, { useState } from 'react';
import {
  Form,
  Input,
  Label,
  Button,
} from 'reactstrap';
import SlumSelector from './SlumSelector';
import { useGeolocation } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useInput } from '../../helpers/hooks';
import { useMutation } from 'react-apollo';
import { REQUEST_DONATION, ADD_RESTAURANT_AS_VOLUNTEER } from '../../graphql/queries';
import { getUserDetails } from '../../helpers/auth';

/**
 * @type {React.FC}
 */
const DonationRequest = () => {
  const [insertDonationRequest] = useMutation(REQUEST_DONATION);
  const [insertAsVolunteer] = useMutation(ADD_RESTAURANT_AS_VOLUNTEER);
  const location = useGeolocation();
  const routeHistory = useHistory();

  const quantityInput = useInput();
  const deliverByInput = useInput(new Date().toISOString());
  const [slum, setSlum] = useState();

  const fileRequest = async (e) => {
    e.preventDefault();

    const variables = {
      donor_id: getUserDetails().id,
      slum_id: slum.id,
      quantity: quantityInput.value,
      delivery_by_time: deliverByInput.value,
      accuracy: location.accuracy,
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const { data } = await insertDonationRequest({
      variables,
    });

    await insertAsVolunteer({
      variables: {
        volunteer_id: getUserDetails().id,
        donation_request_id: data.insert_donation_request.returning[0].id,
      },
    });
    
    routeHistory.push(`/tracker/${data.insert_donation_request.returning[0].id}`);
  };

  return (
    <Form onSubmit={fileRequest} className="p-2">
      <Label>Quantitiy (kgs)</Label>
      <Input onChange={quantityInput.onChange} value={quantityInput.value} type="number" />

      <Label>Expiry time</Label>
      <Input onChange={deliverByInput.onChange} value={deliverByInput.value} />

      <SlumSelector onChange={setSlum} value={slum} />

      <Button type="submit" block className="my-1">Submit</Button>
      {/* {location.latitude} {location.longitude} */}
    </Form>
  );
};

export default DonationRequest;
