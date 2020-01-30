import React from 'react';

import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  return (
    <Navbar color="secondary" dark>
      <NavbarBrand className="mx-auto">FoodFeed</NavbarBrand>
    </Navbar>
  );
};

export default CustomNavbar;
