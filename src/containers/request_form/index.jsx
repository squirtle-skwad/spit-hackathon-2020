import React from 'react';
import {
  Form,
  Input,
  Label,
  Button,
} from 'reactstrap';
import { useGeolocation } from 'react-use';
import { useHistory } from 'react-router-dom';
import { useInput } from '../../helpers/hooks';

/**
 * @type {React.FC}
 */
const DonationRequest = () => {
  const location = useGeolocation();
  const routeHistory = useHistory();

  const slumInput = useInput();
  const quantityInput = useInput();
  const deliverByInput = useInput();

  const fileRequest = (e) => {
    e.preventDefault();

    const variables = {
      donor_id: 1,
      slum_id: slumInput.value,
      quantity: quantityInput.value,
      delivery_by_time: deliverByInput.value,
      accuracy: location.accuracy,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    
    alert("Request made!" + JSON.stringify(variables));

    routeHistory.push("/track");
  };

  return (
    <Form onSubmit={fileRequest}>
      <Label>Slum ID</Label>
      <Input {...slumInput} type="select" />

      <Label>Quantitiy (kgs)</Label>
      <Input {...quantityInput} />

      <Label>Expiry time</Label>
      <Input {...deliverByInput} type="datetime" />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default DonationRequest;
