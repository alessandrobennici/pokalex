import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { RefreshedPageContext } from '../../App';
import BackButton from '../BackButton/BackButton'

const GenericError = ({ error }) => {

   const { refreshedOrFirstAccess, setRefreshedOrFirstAccess } = useContext(RefreshedPageContext);


   const location = useLocation();
   const categoryFilter = location.state && !refreshedOrFirstAccess ? location.state.categoryFilter : 'all';

   return (
      <Row>
         <Col>
            <BackButton categoryFilter={categoryFilter} mainData={location.state ? location.state.mainData : { responseAll: {}, filteredResults: [], sliceNumbers: [] }}></BackButton>
            <div className='text-center h1 text-danger py-5 my-5'>{error}</div>
         </Col>
      </Row>
   )
}

export default GenericError