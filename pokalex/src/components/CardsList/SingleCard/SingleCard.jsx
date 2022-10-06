import React, { useState, createRef } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import $ from 'jquery';
import { LazyLoadImage } from "react-lazy-load-image-component";
import pokeballCaughtIcon from '../../../assets/img/pokeball-caught.png';
import pokeballUncaughtIcon from '../../../assets/img/pokeball-uncaught.png';
import { Link } from 'react-router-dom';
import { prominent } from 'color.js'


const SingleCard = (props) => {


  const [isCaught, setIsCaught] = useState(0);
  const [singlePokemonData, setSinglePokemonData] = useState();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/' + props.pokemonName)
      .then((responseSinglePokemon) => responseSinglePokemon.json())
      .then((dataSinglePokemon) => (setSinglePokemonData(dataSinglePokemon)))

    $('img[data-src]').each((i, img) => {
      console.log(img)
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function () {
        img.removeAttribute('data-src');
      };
    })
  }, [props])

  let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + props.pokemonId + '.png';
  prominent(pokemonImgSrc, { amount: 3, format: 'hex' }).then((data) => console.log(props.pokemonName, '---', data[2]))



  return (
    <Card className='col-12 col-sm-6 col-lg-3 justify-content-center align-items-center mb-5' border='0'>
      <LazyLoadImage src={pokemonImgSrc} width={200} height={200} alt={props.pokemonName + ' picture'}></LazyLoadImage>
      {/* <Card.Body className='d-flex justify-content-between align-items-start w-100 singleCardBody'> */}
      <Card.Body className='singleCardBody w-100 p-0'>
        <Row className='justify-content-between align-items-start p-0 m-0'>
          <Card.Title className='text-capitalize' style={{ 'fontWeight': 'bold' }}>
            {props.pokemonName}
            <LazyLoadImage src={isCaught ? pokeballCaughtIcon : pokeballUncaughtIcon} width={24} height={24} alt={'Pokeball icon'} className='float-end'></LazyLoadImage>
          </Card.Title>
          <Col xs={5}>
            {singlePokemonData ? (singlePokemonData.types.map((pokemonType, i) => (
              <Card.Text key={props.pokemonName + pokemonType.type.name} className='mb-0 text-capitalize'>
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
            <Link to={`/${props.pokemonName}`}><Button className='w-100' variant='primary'>Details</Button></Link>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )
}

export default SingleCard