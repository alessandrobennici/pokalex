import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Abilities = ({ pokemonAbilities }) => {

   console.log('bbbb', pokemonAbilities)

   return (

      <React.Fragment>

         <Row className='align-items-baseline mb-4'>
            <Col xs={12} lg={2}><h2 className='mb-0 fw-bold text-center text-md-start'>Abilities</h2></Col>
         </Row>

         {pokemonAbilities.map((ability, i) => (
            <Row key={i} className='mb-4 pb-3 align-items-center'>
               <Col xs={12} lg={2}>
                  <p className='h4 mb-4 mb-md-0 text-capitalize fw-bold'>{i + 1}. {ability.name}</p>
               </Col>

               <Col xs={12} lg={6} className='pe-5 mb-2 mb-md-0'>
                  <p className='mb-2 fw-bold'>Effect</p>
                  <p className='mb-0 fw-light'>{ability.effect}</p>
               </Col>

               <Col xs={12} lg={4}>
                  <p className='mb-2 fw-bold'>Short effect</p>
                  <p className='mb-0 fw-light'>{ability.short_effect}</p>
               </Col>
            </Row>
         ))}

      </React.Fragment>
   )
}

export default Abilities