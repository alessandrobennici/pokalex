import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { Container } from 'react-bootstrap'

const Navbar = () => {
   return (
      <div id="navbar">
         <Container id="navbar-content">
            <Link to="/">
               <Logo />
            </Link>
         </Container>
      </div>
   )
}

export default Navbar;