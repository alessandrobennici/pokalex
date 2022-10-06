import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PokemonTypes from '../../../components/PokemonTypes/PokemonTypes'
import StatsSection from '../StatsSection/StatsSection'

const HeroPokemonDetails = ({ pokemonData, isCaught }) => {

   let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonData.id + '.png';


   return (
      <React.Fragment>
         <Col xs={{ span: 12, order: 'last' }} md={{ span: 6, order: 'first' }} className='text-center text-md-start d-flex flex-column justify-content-center align-items-center align-items-md-start'>
            <div className='d-flex justify-content-between w-100 align-items-center mb-4'>
               <div><PokemonTypes pokemonData={pokemonData}></PokemonTypes></div>
               <p className='mb-0'>Height: {pokemonData.height}</p>
               <p className='mb-0'>Weight: {pokemonData.weight}</p>
            </div>
            <StatsSection></StatsSection>
         </Col>
         <Col xs={12} md={6} className='text-center text-md-start d-flex flex-column align-items-center align-items-md-end mb-5 mb-md-0'>
            <LazyLoadImage src={pokemonImgSrc} width={250} height={250} alt={pokemonData.name + ' picture'}></LazyLoadImage>
            <Button variant={isCaught ? 'success' : 'danger'} id='catch-or-release-button'>{isCaught ? 'Release' : 'Catch'}</Button>
         </Col>
      </React.Fragment>
   )
}

export default HeroPokemonDetails