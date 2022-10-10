import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, FormControl, InputGroup, Navbar, Offcanvas } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from '../Logo/Logo'
import { SearchContext } from '../../App'


const NavbarCustom = () => {

   const { searchInput, setSearchInput } = useContext(SearchContext);

   const searchInputChange = (e) => {
      setSearchInput(e.target.value)
   }

   return (

      <Navbar expand="sm" bg='white' id="navbar-content">
         <Container>
            <Navbar.Brand href='/'><Logo /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
               <InputGroup id='search-pokemon-input' onChange={searchInputChange}>
                  <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <FormControl
                     placeholder="Search pokemon..."
                     aria-label="Search pokemon..."
                     aria-describedby="basic-addon1"
                  />
               </InputGroup>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   )
}

export default NavbarCustom;