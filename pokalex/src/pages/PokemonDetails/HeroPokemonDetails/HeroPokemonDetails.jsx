import React, { useState } from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PokemonTypes from '../../../components/PokemonTypes/PokemonTypes'
import StatsSection from './Stats/Stats'
import PokeballRollingIcon from '../../../assets/img/pokeball-rolling.gif'

const HeroPokemonDetails = ({ pokemonData, isCaught, setIsCaught }) => {

   const [isLoading, setIsLoading] = useState(false);

   const [triedToCatch, setTriedToCatch] = useState(false);


   const tryToCatch = () => {
      setIsLoading(true);
      if (Math.random() < 0.5) {
         setTimeout(() => {
            console.log('si');
            let caughtPokemonsArray = JSON.parse(localStorage.getItem('caughtPokemons'))
            caughtPokemonsArray.push(pokemonData.name)
            localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemonsArray))
            setIsCaught(1)
            setTriedToCatch(true);
            setIsLoading(false)
         }, 2000)
      } else {
         setTimeout(() => {
            console.log('no');
            setTriedToCatch(true);
            setIsLoading(false)
         }, 2000)
      }

   }

   const releasePokemon = () => {
      console.log('release')
      setIsCaught(0)
      setTriedToCatch(false);
      let caughtPokemonsArray = JSON.parse(localStorage.getItem('caughtPokemons'))
      const indexPokemon = caughtPokemonsArray.indexOf(pokemonData.name);
      caughtPokemonsArray.splice(indexPokemon, 1);
      localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemonsArray))
   }

   let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonData.id + '.png';


   return (
      <Row className='mb-5'>
         <Col xs={{ span: 12, order: 'last' }} md={{ span: 6, order: 'first' }} className='text-center text-md-start d-flex flex-column justify-content-center align-items-center align-items-md-start'>
            <Row className='flex-column flex-md-row justify-content-between w-100 align-items-center mb-5'>
               <Col xs={12} xxl={6} className='mb-3 mb-xxl-0'>
                  <PokemonTypes pokemonData={pokemonData}></PokemonTypes>
               </Col>
               <Col xs={12} xxl={6} className='d-flex justify-content-between flex-row flex-' id='pokemon-details-height-and-weight'>
                  <p className='mb-0'>Height: {pokemonData.height}</p>
                  <p className='mb-0'>Weight: {pokemonData.weight}</p>
               </Col>
            </Row>
            <StatsSection pokemonData={pokemonData}></StatsSection>
         </Col>
         <Col xs={12} md={6} className='text-center text-md-start d-flex flex-column align-items-center align-items-md-end mb-5 mb-md-0'>
            <LazyLoadImage src={pokemonImgSrc} width={250} height={250} alt={pokemonData.name + ' picture'}></LazyLoadImage>
            <Button variant={isCaught ? 'success' : 'danger'} id='catch-or-release-button' onClick={isCaught ? () => releasePokemon() : () => tryToCatch()} disabled={isLoading}>
               {isLoading ? (

                  <img width={20} height={20} style={{ verticalAlign: 'text-top' }} src={PokeballRollingIcon} />
               ) : null} {isCaught ? 'Release' : triedToCatch ? 'Try to catch again' : 'Try to catch'}</Button>
            {triedToCatch ? (
               isCaught ? (
                  <p className='mb-0 text-center text-success' style={{ width: 250 }}><span className='text-capitalize'>{pokemonData.name}</span> caught, congratulations!</p>
               ) : (
                  <p className='mb-0 text-center text-danger' style={{ width: 250 }}><span className='text-capitalize'>{pokemonData.name}</span> escaped!</p>
               )
            ) : null}
         </Col>
      </Row>
   )
}

export default HeroPokemonDetails