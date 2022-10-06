import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { prominent } from 'color.js'
import BackButton from '../../components/BackButton/BackButton';
import HeroPokemonDetails from './HeroPokemonDetails/HeroPokemonDetails';
import PokeballIcon from '../../components/PokeballIcon/PokeballIcon';
import PokemonTypes from '../../components/PokemonTypes/PokemonTypes';

const PokemonDetails = () => {

  const { pokemonName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState({});
  const [titleColor, setTitleColor] = useState(null);

  let isCaught = JSON.parse(localStorage.getItem('caughtPokemons')).includes(pokemonName) ? 1 : 0

  useEffect(() => {
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .then((responsePokemon) => responsePokemon.json())
      .then((responsePokemonData) => {
        setPokemonData(responsePokemonData);
        let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + responsePokemonData.id + '.png';
        prominent(pokemonImgSrc, { amount: 3, format: 'hex' }).then((data) => setTitleColor(data[2]))
          .then(() => /* setTimeout(() => {  */setIsLoading(false)/*  }, 1000) */)
      })
  }, [])

  console.log('dataaaa', pokemonData)

  if (isLoading) {
    return (
      <React.Fragment>
        <BackButton></BackButton>
        <div id="full-page-spinner" className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Row className='align-items-center mb-5'>
        <Col xs={3} lg={2}><BackButton></BackButton></Col>
        <Col xs={6} lg={8}><p className='d-flex justify-content-center align-items-center fw-bold h1 text-capitalize mb-0' style={{ color: titleColor ?? 'inherit' }}>{pokemonName}</p></Col>
        <Col xs={3} lg={2}><PokeballIcon isCaught={isCaught}></PokeballIcon></Col>
      </Row>

      <Row>
        <HeroPokemonDetails pokemonData={pokemonData} isCaught={isCaught}></HeroPokemonDetails>
      </Row>
    </React.Fragment>
  )
}

export default PokemonDetails