import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import { Link } from 'react-router-dom';

/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  return (
    <Navbar color="primary" dark>
      <Link to="/" className="mx-auto">
        <NavbarBrand>FoodFeed</NavbarBrand>
      </Link>
    </Navbar>
  );
};

export default CustomNavbar;
