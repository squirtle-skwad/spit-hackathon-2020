import React from 'react';
import {
    Card, CardImg, CardText, CardBody,CardSubtitle
  } from 'reactstrap';
  
const FeedPost = (props) => {
    const { picture, caption, user } =  props.details 

    return ( 
        <Card style={{ margin:"1rem" }} className=" shadow">
            <CardImg top src={picture} alt="Card picture cap" />
            <CardBody>
                <CardSubtitle style={{color:"black"}}>{user.name}</CardSubtitle>
                <CardText>{caption}</CardText>
            </CardBody>
        </Card>
    );
}
 
export default FeedPost;

