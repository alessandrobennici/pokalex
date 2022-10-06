import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import $ from 'jquery';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';
import PokeballIcon from '../../../components/PokeballIcon/PokeballIcon';


const SingleCard = ({ pokemonName, pokemonId }) => {

  const [singlePokemonData, setSinglePokemonData] = useState();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .then((responseSinglePokemon) => responseSinglePokemon.json())
      .then((dataSinglePokemon) => (setSinglePokemonData(dataSinglePokemon)))

    $('img[data-src]').each((i, img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
        img.removeAttribute('data-src');
      };
    })
  }, [pokemonName, pokemonId])

  let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemonId + '.png';
  let isCaught = JSON.parse(localStorage.getItem('caughtPokemons')).includes(pokemonName) ? 1 : 0


  return (
    <Card className='col-12 col-sm-6 col-lg-3 justify-content-center align-items-center mb-5' border='0'>
      <LazyLoadImage src={pokemonImgSrc} width={200} height={200} alt={pokemonName + ' picture'}></LazyLoadImage>
      <Card.Body className='singleCardBody w-100 p-0'>
        <Row className='justify-content-between align-items-start p-0 m-0'>
          <Card.Title className='text-capitalize' style={{ 'fontWeight': 'bold' }}>
            {pokemonName}
            <PokeballIcon isCaught={isCaught}></PokeballIcon>
          </Card.Title>
          <Col xs={5}>
            {singlePokemonData ? (singlePokemonData.types.map((pokemonType, i) => (
              <Card.Text key={pokemonName + pokemonType.type.name} className='mb-0 text-capitalize'>
                {pokemonType.type.name}
              </Card.Text>
            ))) : null}
          </Col>
          <Col xs={7} className='text-end'>
            <Card.Text className='mb-0'>
              Height: {singlePokemonData ? singlePokemonData.height : null}
            </Card.Text>
            <Card.Text className='mb-0'>
              Weight: {singlePokemonData ? singlePokemonData.weight : null}
            </Card.Text>
          </Col>
          <Col xs={12} className='mt-3'>
            <Link to={`/${pokemonName}`}><Button className='w-100' variant='primary'>Details</Button></Link>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )
}

export default SingleCard