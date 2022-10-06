import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

   const navigate = useNavigate();
   const goBack = () => navigate('/');

   return (
      <Button variant='primary' onClick={() => goBack('/')}>
         <FontAwesomeIcon icon={faArrowLeft} /> <span className='d-none d-md-inline'>Back</span>
      </Button>
   )
}

export default BackButton