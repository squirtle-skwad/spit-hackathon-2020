import React, { useState } from "react";
import {
    Card,
    CardText,
    Input,
    Form,
    Label,
    Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { getUserDetails } from "../../helpers/auth";
import * as queries from "../../graphql/queries/index";
import ImageCustom from '../../components/LidoInput/ImageCustom'
import LoadingPopup from "../../components/Loader/LoadingPopup";

const CheckpointCreate = () => {
    const user = getUserDetails();
    const history = useHistory();
    const [image, setImage] = useState()
    const [caption, setCaption] = useState()

    const uploadPost = postMutation => {
        const variables = {
            userId: user.id,
            picture: image,
            caption: caption
        };
        postMutation({ variables }).then(resp => {
            history.push("/");
        });
    };

    return (
        <>
            <Card
                style={{
                    width: "70%",
                    align: "centre",
                    padding: "2%",
                    marginTop: "4%"
                }}
                className="card border-success mb-3 rounded mx-auto"
            >
                <CardText>
                    <Form>
                        <div className="d-flex justify-content-center align-items-center">
                            <ImageCustom radius={"0%"} value={image} getValue={(val) => setImage(val)} width={"400px"} height={"200px"} />
                        </div>
                        <Label style={{ color: "black" }} for="exampleCaption">Caption</Label>
                        <Input type="text" name="caption" id="exampleCaption" value={caption} style={{ marginBottom: "1rem" }} onChange={(curr) => setCaption(curr.target.value)} />
                        <Mutation mutation={queries.INSERT_POST}>
                            {(postMutation, { loading, error }) => {
                                if (loading) {
                                    return <LoadingPopup isLoading />;
                                }
                                if (error) {
                                    return error;
                                }
                                return (
                                    <Button
                                        type="submit"
                                        onClick={() => uploadPost(postMutation)}
                                    >
                                        Post
                                    </Button>
                                );
                            }}
                        </Mutation>
                    </Form>
                </CardText>
            </Card>
        </>
    );
};

export default CheckpointCreate;
