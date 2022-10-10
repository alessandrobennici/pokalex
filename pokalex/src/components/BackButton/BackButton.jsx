import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshedPageContext } from '../../App';

const BackButton = ({ categoryFilter, mainData }) => {

   const location = useLocation();

   const { refreshedOrFirstAccess, setRefreshedOrFirstAccess } = useContext(RefreshedPageContext);
   location.state ? console.log('LOCATION DATA', location.state.mainData) : console.log('no mainData')


   const navigate = useNavigate();
   console.log('back categoryFilter', categoryFilter)
   return (
      <Button variant='outline-primary' onClick={() => {navigate('/', { state: { categoryFilter: categoryFilter, mainData: mainData } }) }}>
         <FontAwesomeIcon icon={faArrowLeft} /> <span className='d-none d-md-inline'>Home</span>
      </Button>
   )
}

export default BackButton