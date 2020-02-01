import React from 'react';
import { ListGroup, ListGroupItem, Badge, Row, Col } from 'reactstrap';
import { Query } from 'react-apollo'
import LoadingPopup from '../../components/Loader/LoadingPopup';
import * as queries from '../../graphql/queries/index'
import { getUserDetails } from '../../helpers/auth'

const Example = (props) => {
  const userId = (getUserDetails()).id
  const userName = (getUserDetails()).name
  let currentRank = false
  const getLeaderBoard = (data) => {

    const role_weights = {
      "transporter": 0.5,
      "distributor": 0.5,
      "both": 1,
    }

    let leaderBoard = {}
    data.forEach((value, index) => {
      if (value.volunteer.id + " " + value.volunteer.name in leaderBoard) {
        leaderBoard[value.volunteer.id + " " + value.volunteer.name] += value.donation_request.quantity * role_weights[value.role]
      }
      else {
        leaderBoard[value.volunteer.id + " " + value.volunteer.name] = value.donation_request.quantity * role_weights[value.role]
      }
    })
    console.log(leaderBoard)
    let leaderBoardList = []
    Object.keys(leaderBoard).forEach(function (key) {
      leaderBoardList.push([key, leaderBoard[key]]);
    });
    leaderBoardList.sort(function (a, b) { return b[1] - a[1] })
    return leaderBoardList
  }


  const getCurrentRank = (data) => {
    data.forEach((val,index)=>{
      if(userId===(val[0].split(" ")[0]) && index>9){
        currentRank = [index+1,val[1]]  
      }
    })
  }
  return (

    <>
      <Query query={queries.GET_SCORES} >
        {
          ({ data, loading, error }) => {
            if (loading) {
              return <LoadingPopup />
            }
            if (error) {
              return null
            }
            if (data) {
              console.log(data.donation_volunteer)
              const leaderBoard = getLeaderBoard(data.donation_volunteer)
              getCurrentRank(leaderBoard)
              console.log(leaderBoard)
              console.log(userId)
              return (
                <>
                <ListGroup style={{ margin: "2rem" }} className="shadow">
                  {
                    leaderBoard.map((value, index) =>
                      ((value[0].split(" "))[0] === userId ?
                      (<ListGroupItem active className="justify-content-between">
                        <Row>
                          <Col>
                            <Badge pill>{index + 1}</Badge>
                          </Col>
                          <Col>
                            {(value[0].split(" "))[1]}
                          </Col>
                          <Col>
                            {value[1]}
                          </Col>
                        </Row>

                      </ListGroupItem>)
                      :
                      (<ListGroupItem  className="justify-content-between">
                        <Row>
                          <Col>
                            <Badge pill>{index + 1}</Badge>
                          </Col>
                          <Col>
                            {(value[0].split(" "))[1]}
                          </Col>
                          <Col>
                            {value[1]}
                          </Col>
                        </Row>

                      </ListGroupItem>
                      ))
                    )
                  }
                  </ListGroup>
                  
                  {
                    (currentRank ?
                    (
                    <ListGroupItem  className="justify-content-between" style={{margin:"2rem"}}>
                        <Row>
                          <Col>
                            <Badge pill>{currentRank[0]}</Badge>
                          </Col>
                          <Col>
                            {userName}
                          </Col>
                          <Col>
                            {currentRank[1]}
                          </Col>
                        </Row>

                      </ListGroupItem>
                    ):
                    null
                    )
                  }  
                </>
              )
            }
          }
        }
      </Query>
      </>
  );
}

export default Example;