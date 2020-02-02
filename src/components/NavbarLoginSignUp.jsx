import React from 'react'
import { Navbar, Button, NavbarBrand, NavItem } from 'reactstrap'
import { Link } from 'react-router-dom';




const NavbarLoginSignUp = () =>{
    return(
        <Navbar color="primary" dark>
            <NavbarBrand tag={Link} to="/home">FoodFeed</NavbarBrand>
                <Button href="/signup">SignUp</Button>
        </Navbar>
    )
    
}
export default NavbarLoginSignUp