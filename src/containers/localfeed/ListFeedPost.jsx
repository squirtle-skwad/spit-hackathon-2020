import React from "react";
import FeedPost from "./FeedPost";
import slumImage from "../../assets/slum_image";
import { Row, Col } from "reactstrap";

const ListFeedPost = props => {
  let feedPosts = [
    {
      image: slumImage[0],
      userName: "Parag Vaid",
      caption: "Nicceee pic Loved it never felt so googd helping others Thank"
    },
    { image: slumImage[0], userName: "Vikrant Gajria", caption: "Coool pic" },
    { image: slumImage[1], userName: "Preet Shah", caption: "Coool pic" },
    { image: slumImage[2], userName: "Ganan Mandhi", caption: "I'm a gud boy" }
  ];
  return (
    <Row>
      {feedPosts.map((value, index) => (
        <Col>
          <FeedPost details={value} />
        </Col>
      ))}
    </Row>
  );
};

export default ListFeedPost;
