import React,{useState}from 'react';
import {
  Navbar,
  NavbarBrand,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Row,
  Col
} from 'reactstrap';

import { Link, Redirect, useHistory } from 'react-router-dom';
import { getUserDetails } from '../helpers/auth';
import NavbarLoginSignUp from './NavbarLoginSignUp'
/**
 * @type {React.FC}
 */
const CustomNavbar = () => {
  const user = getUserDetails();
  const history = useHistory()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  console.log(user)
 
    return(
      (user !== null)
      ?(
      <Navbar color="primary" dark light expand="lg">
      {user.type.typeName === 'volunteer' ? (
        <Button className="mr-auto" tag={Link} to="/create_checkpoint">CreateCheckpoint</Button>
      ): <Button className="mr-auto" tag={Link} to="/donate/request">Donate</Button>
      };

      <NavbarBrand tag={Link} to="/">FoodFeed</NavbarBrand>
      <Row xs="4">
        <Col></Col>
      {user.type.typeName === 'volunteer'
        ?(<Col><Dropdown isOpen={dropdownOpen} toggle={toggle} style={{marginRight:"4rem"}}>
            <DropdownToggle caret>Nearby</DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/donation_request">Restaurant</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/checkpoint">Checkpoint</DropdownItem>
            </DropdownMenu>
          </Dropdown></Col>)
        : null
      }
      <Col><Button style={{marginRight:"0rem"}}tag={Link} className="" onClick={()=>{
        localStorage.clear()
        history.push('/login')
      }}>Logout</Button></Col>
      <Col><Button className="ml-auto" tage={Link} to="/profile">Profile</Button></Col>
      </Row>
    </Navbar>)
    :
    <Redirect to="/login"/>
    
  ); 
  
};

export default CustomNavbar;
