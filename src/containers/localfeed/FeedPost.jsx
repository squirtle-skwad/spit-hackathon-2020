import React from 'react';
import {
    Card, CardImg, CardText, CardBody,CardSubtitle
  } from 'reactstrap';
  
const FeedPost = (props) => {
    const { image, caption, userName } =  props.details 

    return ( 
        <Card style={{ margin:"1rem" }} className=" shadow">
            <CardImg top src={image} alt="Card image cap" />
            <CardBody>
                <CardSubtitle style={{color:"black"}}>{userName}</CardSubtitle>
                <CardText>{caption}</CardText>
            </CardBody>
        </Card>
    );
}
 
export default FeedPost;

