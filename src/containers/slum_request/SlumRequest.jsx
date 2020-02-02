import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import {
  useMutation
} from 'react-apollo';
import { useHistory } from 'react-router-dom';
import { REQUEST_SLUM } from '../../graphql/queries';
import ImageCustom from '../../components/LidoInput/ImageCustom'
import SelectorMap from '../../components/SelectorMap';

const SlumRequest = (props) => {
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [noOfPeople, setNoOfPeople] = useState()
  const [loc, setLoc] = useState({});
  
  const [reqSlum] = useMutation(REQUEST_SLUM);
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    const variables ={
      name: name,
      picture: image,
      number_of_people: noOfPeople,
      lat: loc.lat,
      lgn: loc.lng,
    };

    const { data } = await reqSlum({
      variables,
    });
    alert("Thank you for the suggestion!");

    history.push("/");
  }

  return (
    <>
      <SelectorMap onChange={setLoc} />
      <Container>
        {loc.lat} {loc.lng}
        <Form onSubmit={onSubmit}>
          <FormGroup row>
            <Label for="examplename">Name</Label>
            <Input type="text" name="name" id="examplename" value={name} onChange={(curr)=>setName(curr.target.value)} />
          </FormGroup>
          <FormGroup row>
            <Label for="examplenoofpeople">Number Of People</Label>
            <Input type="number" name="noofpeople" id="examplenoofpeople" value={noOfPeople} onChange={(curr)=>setNoOfPeople(curr.target.value)}/>
          </FormGroup>
          <ImageCustom radius={"0%"} value={image} getValue={(val) => setImage(val)} />
          <div className="d-flex justify-content-center align-items-center" style={{marginTop:"2rem"}}>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default SlumRequest;