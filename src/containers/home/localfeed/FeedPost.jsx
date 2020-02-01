import React from 'react';
import {
    Card, CardImg, CardText, CardBody,CardSubtitle
  } from 'reactstrap';
  
const FeedPost = (props) => {

    const { image, caption, userName } =  props.details 


    return ( 
        <Card style={{ width: '19rem', margin:"1rem"}} className=" shadow">
            <CardImg top style={{ width: '100%', height:'13rem' }} src={image} alt="Card image cap" />
            <CardBody style={{height:"7rem"}}>
                <CardSubtitle style={{color:"black"}}>{userName}</CardSubtitle>
                <CardText>{caption}</CardText>
            </CardBody>
        </Card>
    );
}
 
export default FeedPost;

