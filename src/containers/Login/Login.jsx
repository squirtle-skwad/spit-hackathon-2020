import React,{useState} from 'react';
import {Card, CardText} from 'reactstrap'

import Input from "../../components/Input/Input"
const Login = (props) =>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isValidEmail,setValidEmail] = useState(false)
    const [isValidPassword,setValidPassword] = useState(false)


    const onEmailChange = (curr)=>{
        setEmail(curr)
        if(curr!== ''){
            setValidEmail(true)
        } 
    }


    const onPassChange = (curr)=>{
        setPassword(curr)
        if(curr!== ''){
            setValidPassword(true)
        }
    }


    const onLogin = () =>{
        console.log("True")
    }


    return(
        <>        
            <Card style={{ width: '400px' ,align:"centre", padding: '2%' , marginTop:"4%"}} className="card border-success mb-3 rounded mx-auto">
                <CardText>
                    {console.log(props)}
                <Input type = 'email' placeholder={'Email'} label={'Email '} valid={isValidEmail} value = {email} onChange={onEmailChange}/>
                <Input type = 'password' placeholder={'Password'} label={'Password '} valid={isValidPassword} value = {password} onChange={onPassChange}/>
                <button type="submit" class="btn btn-secondary" onClick={console.log("Sokcess")} disabled={ !(isValidPassword && isValidEmail)}>Submit</button>

                </CardText>
            </Card>
        </>
    );
};
export default Login;