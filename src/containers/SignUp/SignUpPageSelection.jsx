import React from 'react'
import { Card, CardImg } from 'reactstrap'
import { Mutation } from 'react-apollo'
import avatar from '../../assets/images/avatar.png'
import restaurant from '../../assets/images/restaurant.png'
import { getUserDetails, setUserDetails } from '../../helpers/auth'
import LoadingPopup from '../../components/Loader/LoadingPopup'
import { useHistory } from 'react-router-dom';
import * as queries from '../../graphql/queries/index'

const SignUpPageSelection = (props) => {
    const user = getUserDetails()
    const routeHistory = useHistory()

    const setType = (userType, postMutation) => {
        const variables = {
            typeId: userType,
        }

        const type_mapper = {
            1: "volunteer",
            2: "restaurant"
        }

        postMutation({ variables }).then(
            resp => {
                user.type.typeName = type_mapper[userType]
                setUserDetails(user)
                routeHistory.push('/')
            }
        )
    }

    return (
        <>
            <Mutation mutation={queries.UPDATE_USER_TYPE} variables={{userId: user.id, typeId:1}} >
                {
                    (postMutation, { loading, error }) => {
                        if (loading) {
                            return <LoadingPopup isOpen />
                        }
                        if (error) {
                            alert(error)
                        }

                        return (
                            <Card tag="a" onClick={() => setType(1, postMutation)} style={{ width: '50%', align: "centre", marginTop: "4%", cursor: "pointer" }} className="card border-success mb-3 rounded mx-auto">
                                <div class="card mb-3" style={{ width: "100%", align: "centre" }}>
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <CardImg src={avatar} />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h4 class="card-title">Volunteer</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                    }
                }
            </Mutation>

            <Mutation mutation={queries.UPDATE_USER_TYPE} variables={{ userId: user["id"] }}>
                {
                    (postMutation, { loading, error }) => {
                        if (loading) {
                            return <LoadingPopup isOpen/>
                        }
                        if (error) {
                            return
                        }

                        return (
                            <Card tag="a" onClick={() => setType(2, postMutation)} style={{ width: '50%', align: "centre", marginTop: "4%", cursor: "pointer" }} className="card border-success mb-3 rounded mx-auto">
                                <div class="card mb-3" style={{ width: "100%", align: "centre" }}>
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <CardImg src={restaurant} />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h4 class="card-title">Restaurant</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                    }
                }
            </Mutation>

        </>
    );
};
export default SignUpPageSelection