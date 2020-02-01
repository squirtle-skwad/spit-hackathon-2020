import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import ImageCustom from '../../components/LidoInput/ImageCustom'

const SlumRequest = (props) => {
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [noOfPeople, setNoOfPeople] = useState()

  const onSubmit = () => {
    const variables ={
      name: name,
      picture: image,
      no_of_people: noOfPeople 
    }
    console.log(variables)
  }

  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="examplename">Name</Label>
          <Input type="text" name="name" id="examplename" value={name} onChange={(curr)=>setName(curr.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplenoofpeople">Number Of People</Label>
          <Input type="number" name="noofpeople" id="examplenoofpeople" value={noOfPeople} onChange={(curr)=>setNoOfPeople(curr.target.value)}/>
        </FormGroup>
        <ImageCustom radius={"0%"} value={image} getValue={(val) => setImage(val)} />
        <div className="d-flex justify-content-center align-items-center" style={{marginTop:"2rem"}}>
          <Button onClick={()=>onSubmit()}>Submit</Button>  
        </div>
        
      </Form>
    </Container>

  );
}

export default SlumRequest;