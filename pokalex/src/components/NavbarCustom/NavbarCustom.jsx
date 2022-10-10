import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Container, FormControl, InputGroup, Navbar, Offcanvas } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Logo from '../Logo/Logo'
import { SearchContext } from '../../App'


const NavbarCustom = () => {

   const [hideSearch, setHideSearch] = useState(true)
   const { searchInput, setSearchInput } = useContext(SearchContext);
   const currentLocation = useLocation();

   useEffect(() => {
      if (currentLocation.pathname === '/') {
         setHideSearch(false)
      } else {
         setHideSearch(true)
      }
   })

   const searchInputChange = (e) => {
      setSearchInput(e.target.value)
   }


   return (

      <Navbar expand="sm" bg='white' id="navbar-content">
         <Container>
            <Navbar.Brand href='/'><Logo /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={hideSearch ? 'd-none' : ''} />
            <Navbar.Collapse id="basic-navbar-nav" className={`justify-content-end ${hideSearch ? 'd-none' : ''}`}>
               <InputGroup id='search-pokemon-input' onChange={searchInputChange} className={hideSearch ? 'd-none' : ''}>
                  <InputGroup.Text id="basic-addon1" className={hideSearch ? 'd-none' : ''}><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
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