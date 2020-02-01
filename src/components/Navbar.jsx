import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
// import { useLocalStorage } from 'react-use';
import { dummyUser } from '../helpers/auth';

/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  const user =  dummyUser;
  const user = useLocalStorage("user");

  return (
    <Navbar color="primary" dark>
      {user.type.typeName === 'volunteer' && (
        <Button className="mr-auto" tag={Link} to="/volunteer">Volunteer</Button>
      )}

      <NavbarBrand tag={Link} to="/">FoodFeed</NavbarBrand>

      {user.type.typeName === 'volunteer'
        ? <Button className="ml-auto" tag={Link} to="/checkpoints">Checkpoints</Button>
        : <Button className="ml-auto" tag={Link} to="/donation/request">Donate</Button>
      }
    </Navbar>
  );
};

export default CustomNavbar;
