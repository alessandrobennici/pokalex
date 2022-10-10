import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import $ from 'jquery';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom';
import PokeballIcon from '../../../components/PokeballIcon/PokeballIcon';
import PokemonTypes from '../../../components/PokemonTypes/PokemonTypes';
import GenericError from '../../../components/GenericError/GenericError';



const SingleCard = ({ pokemonName, pokemonId, categoryFilter, setIsLoading, lastCard, mainData }) => {

  const [singlePokemonData, setSinglePokemonData] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);


  useEffect(() => {
    $('img[data-src]').each((i, img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
        img.removeAttribute('data-src');
      };
    })

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .then((responseSinglePokemon) => responseSinglePokemon.json())
      .then((dataSinglePokemon) => (setSinglePokemonData(dataSinglePokemon)))
      .then(() => lastCard ? setIsLoading(false) : null)
      .catch(() => {
        setIsLoading(false)
        setError('There was an error with your request, please try again later.')
      })
  }, [pokemonName, pokemonId])

  let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonId + '.png';
  let isCaught = JSON.parse(localStorage.getItem('caughtPokemons')).includes(pokemonName) ? 1 : 0

  if (error) {
    return (
      <GenericError error={error}></GenericError>
    )
  }

  return (
    <Card className='col-12 col-sm-6 col-xl-3 justify-content-center align-items-center mb-5' border='0'>
      <LazyLoadImage src={pokemonImgSrc} width={200} height={200} alt={pokemonName + ' picture'}></LazyLoadImage>
      <Card.Body className='single-card-body w-100 p-0'>
        <Row className='justify-content-between align-items-start p-0 m-0'>
          <Card.Title className='text-capitalize' style={{ 'fontWeight': 'bold' }}>
            {pokemonName}
            <PokeballIcon isCaught={isCaught}></PokeballIcon>
          </Card.Title>
          <Col xs={6}>
            <Card.Text className='mb-0'>
              Height: {singlePokemonData ? singlePokemonData.height : null}
            </Card.Text>
            <Card.Text className='mb-0'>
              Weight: {singlePokemonData ? singlePokemonData.weight : null}
            </Card.Text>
          </Col>
          <Col xs={6} className='text-end'>
            <PokemonTypes pokemonData={singlePokemonData} renderInSingleCard={true}></PokemonTypes>
          </Col>
          <Col xs={12} className='mt-3'>
            <Button className='w-100' variant='primary' onClick={() => navigate('/' + pokemonName, { state: { categoryFilter: categoryFilter, mainData: mainData } })}>Details</Button>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )
}

export default SingleCard