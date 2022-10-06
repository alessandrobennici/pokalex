import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'

const Footer = () => {
   return (
      <div id='footer' className='position-fixed w-100'>
         <Container className='d-flex justify-content-between align-items-center'>
            <Link to="/">
               <Logo />
            </Link>
            <a href="https://www.flaticon.com/free-icons/pokemon" className='text-white' style={{ 'fontSize': '8px' }} title="pokemon icons">Pokemon icons created by Those Icons - Flaticon</a>
         </Container>
      </div>
   )
}

export default Footer