import React,{useState} from 'react';
import {Card, CardText, Button } from 'reactstrap'
import Input from "../../components/LidoInput/Input"
import LoadingPopup from '../../components/Loader/LoadingPopup'
import { Mutation } from 'react-apollo';
import * as queries from '../../graphql/queries/index'
import {useHistory} from 'react-router-dom'
import {setUserDetails } from '../../helpers/auth'

const SignUpPageDetails = (props) =>{

        const [firstname,setFirstName] = useState('')
        const [lastname,setLastName] = useState('')
        const [email,setEmail] = useState('')
        const [phone,setPhone] = useState('')
        const [password, setPassword] = useState('')
        const [password2, setPassword2] = useState('')
        const [isValidEmail,setValidEmail] = useState(false)
        const history = useHistory()

        const validEmail = (curr)=>{
            setEmail(curr)
            if(curr!== ''){
                setValidEmail(true)
            } 
        }

        const SignUp = (postMutation) => {
            const variables = {
                name : firstname + " " + lastname,
                email,
                password,
                phone
            }
            postMutation({ variables }).then(
                resp =>{
                    setUserDetails(resp.data.insert_user.returning[0])
                    history.push('signup/selection')
                }
            )   
        }

        return(
            <>
            <Card style={{ width: '70%' ,align:"centre", padding: '2%' , marginTop:"4%"}} className="card border-success mb-3 rounded mx-auto">
                <CardText>
                <Input type = 'text' placeholder={'First Name'} label={'First Name '} valid={true} value = {firstname} onChange={(curr) => {setFirstName(curr)}}/>
                <Input type = 'text' placeholder={'Last Name'} label={'Last Name '} valid={true} value = {lastname} onChange={(curr) => {setLastName(curr)}}/> 
                <Input type = 'number' placeholder={'Mobile Number'} label={'Mobile Number '} valid={true} value = {phone} onChange={(curr) => {setPhone(curr)}}/>  
                <Input type = 'email' placeholder={'Email'} label={'Email '} valid={isValidEmail} value = {email} onChange={validEmail}/>
                <Input type = 'password' placeholder={'Password'} label={'Password '} valid={true} value = {password} onChange={(curr) => {setPassword(curr)}}/>
                <Input type = 'password' placeholder={'Password Again'} label={'Confirm Password '} valid={true} value = {password2} onChange={(curr) => {setPassword2(curr)}}/>
                {password===password2 || password2===""? null: <h6 style={{color:"red"}}>Password does not match</h6>}
                <Mutation mutation={queries.CREATE_USER} >
                {
                    (postMutation,{loading,error}) => {
                        if(loading){
                            return  <LoadingPopup isLoading/>
                        }
                        if (error){

                        }
                        return(
                            <Button type="submit"  onClick={()=>SignUp(postMutation)}>Submit</Button>
                        )
                    }
                }
                </Mutation>

                
                </CardText>
            </Card>
            </>
        );
    };


export default SignUpPageDetails