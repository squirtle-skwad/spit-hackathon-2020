import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';
import { useLocalStorage } from 'react-use';
import { Link } from 'react-router-dom';
import { dummyUser } from '../helpers/auth';

/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  const user =  dummyUser;

  return (
    <Navbar color="primary" dark>
      {user.type.typeName === 'volunteer' && (
        <Button tag={Link} to="/volunteer">Volunteer</Button>
      )}

      <NavbarBrand tag={Link} to="/" className="mx-auto">FoodFeed</NavbarBrand>

      {user.type.typeName === 'volunteer'
        ? <Button tag={Link} to="/checkpoints">Checkpoints</Button>
        : <Button tag={Link} to="/request">Donate</Button>
      }
    </Navbar>
  );
};

export default CustomNavbar;
