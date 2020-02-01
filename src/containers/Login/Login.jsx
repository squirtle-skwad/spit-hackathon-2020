import React, { useState } from "react";
import { Card, CardText, Button } from "reactstrap";
import { useApolloClient } from "react-apollo";
import * as queries from "../../graphql/queries/index";
import { useHistory } from "react-router-dom";
import Input from "../../components/LidoInput/Input";
import { setUserDetails } from "../../helpers/auth";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);
  const client = useApolloClient();
  const routeHistory = useHistory();

  const onEmailChange = curr => {
    setEmail(curr);
    if (curr !== "") {
      setValidEmail(true);
    }
  };

  const onPassChange = curr => {
    setPassword(curr);
    if (curr !== "") {
      setValidPassword(true);
    }
  };

  const onLogin = () => {
    client
      .query({
        query: queries.GET_USER_LOGIN,
        variables: {
          email: email,
          password: password
        }
      })
      .then(resp => {
        if (!resp.data.user.length) {
          alert("Invalid Details");
        } else {
          setUserDetails(resp.data.user[0]);
          routeHistory.push("/home");
        }
      });
  };

  return (
    <>
      <Card
        style={{
          width: "400px",
          align: "centre",
          padding: "2%",
          marginTop: "4%"
        }}
        className="card border-success mb-3 rounded mx-auto"
      >
        <CardText>
          <Input
            type="email"
            placeholder={"Email"}
            label={"Email "}
            valid={isValidEmail}
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type="password"
            placeholder={"Password"}
            label={"Password "}
            valid={isValidPassword}
            value={password}
            onChange={onPassChange}
          />
          <Button
            type="submit"
            onClick={() => onLogin()}
            disabled={!(isValidPassword && isValidEmail)}
          >
            Submit
          </Button>
        </CardText>
      </Card>
    </>
  );
};
export default Login;
