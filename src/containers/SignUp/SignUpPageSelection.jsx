import React, { useState } from 'react'
import { Card, CardText, CardImg } from 'reactstrap'
import avatar from '../../assets/images/avatar.png'
import restaurant from '../../assets/images/restaurant.png'

const SignUpPageSelection = (props) =>{
    const[type,setType] = useState(0)



    return(
        <>
            <Card tag="a" onClick={() => {setType(1)}} style={{ width: '50%' ,align:"centre", marginTop:"4%", cursor: "pointer"}} className="card border-success mb-3 rounded mx-auto">
                <div class="card mb-3" style={{width: "100%" ,align:"centre"}}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <CardImg src= { avatar }/>
                        </div>
                        <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">Volunteer</h4>
                                </div>
                        </div>
                    </div>
                </div>
                </Card> 
                <Card tag="a" onClick={() => {setType(2)}} style={{ width: '50%' ,align:"centre", marginTop:"4%", cursor: "pointer"}} className="card border-success mb-3 rounded mx-auto">
                <div class="card mb-3" style={{width: "100%" ,align:"centre"}}>
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <CardImg src= { restaurant }/>
                        </div>
                        <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title">Restaurant</h4>
                                </div>
                        </div>
                    </div>
                </div>
            </Card> 
        </>
    );
};
export default SignUpPageSelection