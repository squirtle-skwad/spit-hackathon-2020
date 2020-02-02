import React from "react";
import FeedPost from "./FeedPost";
import slumImage from "../../assets/slum_image";
import { CardColumns } from "reactstrap";
import { Query } from "react-apollo";
import LoadingPopUp from '../../components/Loader/LoadingPopup'
import * as queries from '../../graphql/queries/index'

const ListFeedPost = props => {
  
  return (
    <CardColumns>
      <Query query={queries.GET_POST}>
        {
          ({ data, loading, error }) => {
            if (loading) {
              return <LoadingPopUp />
            }
            if (error) {
              return null
            }
            return (
              data.user_post.map((value, index) =>
                <FeedPost details={value} />
              )
            );
          }


        }
      </Query>

    </CardColumns>
  );
};

export default ListFeedPost;
