import React from "react";
import FeedPost from "./FeedPost";
import slumImage from "../../assets/slum_image";
import { CardColumns } from "reactstrap";

const ListFeedPost = props => {
  let feedPosts = [
    { image: slumImage[0], userName: "Parag Vaid", caption: "Nicceee pic Loved it never felt so googd helping others Thank" },
    { image: slumImage[0], userName: "Vikrant Gajria", caption: "Coool pic" },
    { image: slumImage[1], userName: "Preet Shah", caption: "Coool pic" },
    { image: slumImage[2], userName: "Ganan Mandhi", caption: "I'm a gud boy" },
  ];
  return (
    <CardColumns>
      {feedPosts.map((value, index) => (
        <FeedPost details={value} />
      ))}
    </CardColumns>
  );
};

export default ListFeedPost;
