import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useLocation, useParams } from "react-router-dom";
import { prominent } from 'color.js'
import BackButton from '../../components/BackButton/BackButton';
import HeroPokemonDetails from './HeroPokemonDetails/HeroPokemonDetails';
import PokeballIcon from '../../components/PokeballIcon/PokeballIcon';
import Abilities from './Abilities/Abilities';
import { RefreshedPageContext } from '../../App';
import GenericError from '../../components/GenericError/GenericError';

const PokemonDetails = () => {

  const { refreshedOrFirstAccess, setRefreshedOrFirstAccess } = useContext(RefreshedPageContext);


  const location = useLocation();
  const categoryFilter = location.state && !refreshedOrFirstAccess ? location.state.categoryFilter : 'all';

  console.log('pokemonDetails - categoryFilter', categoryFilter)

  const { pokemonName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState({});
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [titleColor, setTitleColor] = useState(null);
  const [error, setError] = useState(null);
  const [isCaught, setIsCaught] = useState(JSON.parse(localStorage.getItem('caughtPokemons')).includes(pokemonName) ? 1 : 0)


  useEffect(() => {
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
      .then((responsePokemon) => responsePokemon.json())
      .then((responsePokemonData) => {
        setPokemonData(responsePokemonData);
        let pokemonImgSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + responsePokemonData.id + '.png';
        prominent(pokemonImgSrc, { amount: 3, format: 'hex' }).then((data) => setTitleColor(data[2]))
        responsePokemonData.abilities.map((pokemonDataAbility, i) =>
          fetch(pokemonDataAbility.ability.url)
            .then((responseAbility) => responseAbility.json())
            .then((dataResponseAbility) => {

              setPokemonAbilities(prevState => [...prevState, {
                'name': dataResponseAbility['name'],
                'effect': dataResponseAbility.effect_entries.find(x => x.language.name === 'en').effect,
                'short_effect': dataResponseAbility.effect_entries.find(x => x.language.name === 'en').short_effect,
              }])
            })
            .catch(() => {
              setIsLoading(false)
              setError('There was an error with your request, please try again later.')
            })
        )
      })
      .catch(() => {
        setIsLoading(false)
        setError('There was an error with your request, please try again later.')
      })
      .then(() => /* setTimeout(() => {  */setIsLoading(false)/*  }, 1000) */)
  }, [])

  console.log('DETAILS data', pokemonData)

  if (error) {
    return (
      <GenericError error={error}></GenericError>
    )
  }

  if (isLoading) {
    return (
      <React.Fragment>
        <BackButton categoryFilter={categoryFilter} mainData={location.state ? location.state.mainData : { responseAll: {}, filteredResults: [], sliceNumbers: [] }}></BackButton>
        <div id="full-page-spinner" className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Row className='align-items-center mb-5'>
        <Col xs={3} lg={2}><BackButton categoryFilter={categoryFilter} mainData={location.state ? location.state.mainData : { responseAll: {}, filteredResults: [], sliceNumbers: [] }}></BackButton></Col>
        <Col xs={6} lg={8}><p className='d-flex justify-content-center align-items-center fw-bold h1 text-capitalize mb-0' style={{ color: titleColor ?? 'inherit' }}>{pokemonName}</p></Col>
        <Col xs={3} lg={2}><PokeballIcon isCaught={isCaught}></PokeballIcon></Col>
      </Row>

      <HeroPokemonDetails pokemonData={pokemonData} isCaught={isCaught} setIsCaught={setIsCaught}></HeroPokemonDetails>
      <Abilities pokemonAbilities={pokemonAbilities}></Abilities>
    </React.Fragment>
  )
}

export default PokemonDetails