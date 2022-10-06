import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { Container } from 'react-bootstrap'

const Navbar = () => {
   return (
      <Container id="navbar-content">
         <Link to="/">
            <Logo />
         </Link>
      </Container>
   )
}

export default Navbar;