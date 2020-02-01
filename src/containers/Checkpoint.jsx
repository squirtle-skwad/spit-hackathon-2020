import React, { useState, useEffect } from 'react'
import { ListGroup } from 'reactstrap'
import { useGeolocation } from 'react-use'

const Checkpoint = () =>{
    const [checkpoints,setCheckpoints] = useState([])
    const [loading, setLoading] = useState(true)
    const [location,setLocation] = useState('')
    
    
    const getCheckpoint = () =>{
        const state = useGeolocation();
        const location = JSON.stringify(state, null, 2)
        // Integrate the checkpoints here
    }

    useEffect(() =>{
        getCheckpoint().then(checkpoints => setCheckpoints(checkpoints))
    },[])


    return (
    <>
        <ListGroup>
                    {
            checkpoints.map((checkpoint) => {
                <ListGroupItem> 
                    {/* all the attributes using checkpoint. */}
                </ListGroupItem>

            })
        }
        </ListGroup>
    </>
    )
}