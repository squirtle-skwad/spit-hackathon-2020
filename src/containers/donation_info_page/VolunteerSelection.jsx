import React,{ useState } from 'react';
import {Card, CardTitle, Input, Form, FormGroup,
    Col, Row, Label, Button } from 'reactstrap';

const VolunteerSelection = (props) => {
    const cardStyle={ margin:"2rem" }
    const cardStyleActive={ margin:"2rem", border:"2px solid green" }
//TODO: Add an image for instead of CardTitle and put the text in button
        
    const [role,setRole] = useState(0)

    return ( 
        <>
        {(role === 1) ?
            <Card style={cardStyleActive} className="shadow" body inverse color="info">
                <CardTitle>Volunteer As A Picker And Distributer</CardTitle>
                <Button color="secondary" onClick={()=>setRole(1)}>Volunteer</Button>
            </Card>
            :
            <Card style={cardStyle} className="shadow" body inverse color="info">
                <CardTitle>Volunteer As A Picker And Distributer</CardTitle>
                <Button color="secondary" onClick={()=>setRole(1)}>Volunteer</Button>
            </Card>
        }
        {(role === 2)?
            <Card style={cardStyleActive} className="shadow" body inverse color="warning">
                <CardTitle>Volunteer As A Transporter</CardTitle>
                <Button color="secondary" onClick={()=>setRole(2)}>Volunteer</Button>
            </Card>
            :
            <Card style={cardStyle} className="shadow" body inverse color="warning">
                <CardTitle>Volunteer As A Transporter</CardTitle>
                <Button color="secondary" onClick={()=>setRole(2)}>Volunteer</Button>
            </Card>
        }
        {(role === 3)?
            <Card style={cardStyleActive} className="shadow" body inverse color="primary">
                <CardTitle>Volunteer As Both</CardTitle>
                <Button color="secondary" onClick={()=>setRole(3)}>Volunteer</Button>
            </Card>
            :
            <Card style={cardStyle} className="shadow" body inverse color="primary">
                <CardTitle>Volunteer As Both</CardTitle>
                <Button color="secondary" onClick={()=>setRole(3)}>Volunteer</Button>
            </Card>
        }
        <Form>
            <Row form>
                <Col md={6}>
                <FormGroup>
                    <Label for="startTime">Start Time</Label>
                    <Input type="time" name="startTime" id="startTime"/>
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                    <Label for="endTime">End Time</Label>
                    <Input type="time" name="endTime" id="endTime"/>
                </FormGroup>
                </Col>
            </Row>
            <Button color="success" >Submit</Button>
        </Form>
        </>
     );
}
 
export default VolunteerSelection;