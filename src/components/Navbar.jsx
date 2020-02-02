import React, { useState } from "react";
import {
  Navbar,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Jumbotron,
} from "reactstrap";

import { Link, Redirect, useHistory } from "react-router-dom";
import { getUserDetails } from "../helpers/auth";
import { MapPin, Camera, User, LogOut, Gift } from 'react-feather';

/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  const user = getUserDetails();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Jumbotron className="d-flex bg-primary flex-column justify-content-center align-items-center m-0 py-2">
        <Link to="/">
          <h1 className="text-white">FoodFeed</h1>
        </Link>
      </Jumbotron>
      <Navbar color="light" expand="lg" className="border-bottom border-aqua">
        {user.type.typeName === "volunteer" ? (
          <>
          <Link tag={Link} to="/upload_post" className="mr-2">
            <Camera />
          </Link>
          <Link tag={Link} to="/create_checkpoint">
            <MapPin />
          </Link>
          </>
        ) : (
            <Button tag={Link} to="/donate/request">
              <Gift />
            </Button>
          )}
        {user.type.typeName === "volunteer" ? (
          <Dropdown
            outline
            className="ml-4 btn-primary"
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret color="primary">Nearby</DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to="/donation_request">
                Restaurant
                </DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag={Link} to="/checkpoint">
                Checkpoint
                </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : null}

        <Link className="ml-auto"
          onClick={() => {
            localStorage.clear();
            history.push("/login");
          }}
        >
          <LogOut />
        </Link>

        <Link to="/profile" className="ml-4">
          <User />
        </Link>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
