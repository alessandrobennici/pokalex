import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Row, Spinner } from 'react-bootstrap';
import SingleCard from '../SingleCard/SingleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { RefreshedPageContext, SearchContext } from '../../../App';
import GenericError from '../../../components/GenericError/GenericError';
import $ from 'jquery'

const CardList = () => {

   const location = useLocation();
   const { refreshedOrFirstAccess, setRefreshedOrFirstAccess } = useContext(RefreshedPageContext);

   const { searchInput, setSearchInput } = useContext(SearchContext);

   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingButton, setIsLoadingButton] = useState(false);
   const [responseAll, setResponseAll] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.responseAll : { results: [], count: 0 });
   const [filteredResults, setFilteredResults] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.filteredResults : []);
   const [categoryFilter, setCategoryFilter] = useState(location.state && !refreshedOrFirstAccess ? location.state.categoryFilter : 'all')
   const [sliceNumbers, setSliceNumbers] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.sliceNumbers : [0, 20])
   const [buttonHidden, setButtonHidden] = useState(false)
   const [searchResults, setSearchResults] = useState('initial')
   const [error, setError] = useState(null);


   if (location.state) {
      setRefreshedOrFirstAccess(false)
   }

   useEffect(() => {
      setSearchResults(responseAll.results.filter((pokemon, i) => pokemon.name.toLowerCase().startsWith(searchInput)).length)
   })

   useEffect(() => {
      filterPokemons(categoryFilter)
   }, [categoryFilter, searchResults])

   useEffect(() => {
      setFilteredResults((prevState) => prevState.concat(responseAll.results.slice(sliceNumbers[0], location.state && !refreshedOrFirstAccess ? 0 : sliceNumbers[1])))
      filterPokemons(categoryFilter)
   }, [sliceNumbers])

   const showMore = () => {
      setSliceNumbers([sliceNumbers[0] + 20, sliceNumbers[1] + 20]);
   }


   useEffect(() => {
      setSearchInput('')
      if (refreshedOrFirstAccess) {
         setIsLoadingButton(true)
         fetch('https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0')
            .then((responseAllPokemons) => responseAllPokemons.json())
            .then((allPokemonsData) => (setResponseAll(allPokemonsData), setFilteredResults(allPokemonsData.results.slice(sliceNumbers[0], sliceNumbers[1]))))
            .then(() => /* setTimeout(() => { */setIsLoadingButton(false), setRefreshedOrFirstAccess(false) /* }, 1000) */)
            .catch(() => {
               setIsLoading(false)
               setIsLoadingButton(false)
               setError('There was an error with your request, please try again later.')
            })
      }
   }, [])

   let caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons'));

   const filterPokemons = (category) => {
      switch (category) {
         case 'all':
            setFilteredResults(responseAll.results.slice(0, sliceNumbers[1]))
            setButtonHidden(false)
            break;
         case 'caught':
            setFilteredResults(responseAll.results.filter(pokemon => caughtPokemons.includes(pokemon.name)).slice(0, sliceNumbers[1]));
            setButtonHidden(responseAll.results.filter(pokemon => caughtPokemons.includes(pokemon.name)).slice(0, sliceNumbers[1]).length === caughtPokemons.length)
            break;
         case 'uncaught':
            setFilteredResults(responseAll.results.filter(pokemon => !caughtPokemons.includes(pokemon.name)).slice(0, sliceNumbers[1]));
            setButtonHidden(false)
            break;
         default:
            break;
      }
   }

   if (error) {
      return (
         <GenericError error={error}></GenericError>
      )
   }

   return (
      <React.Fragment>
         {isLoading ? (
            <div id="full-page-spinner" className='d-flex justify-content-center align-items-center position-fixed w-100 bg-white'>
               <Spinner animation="border" variant="primary"></Spinner>
            </div>
         ) : null}
         <div id='card-list'>
            <Row className='justify-content-between align-items-center'>
               <Col xs={8}>
                  <h1 className='fw-bold'>Pokalex</h1>
               </Col>
               <Col xs={4} className='d-flex align-items-center justify-content-end'>
                  <Dropdown>
                     <Dropdown.Toggle variant='outline-primary' disabled={searchInput !== ''}>
                        <FontAwesomeIcon icon={faFilter}/> Filters
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setCategoryFilter('all') }} active={categoryFilter === 'all'}>All ({responseAll ? responseAll.count : 0})</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setCategoryFilter('caught') }} active={categoryFilter === 'caught'}>Caught ({caughtPokemons.length})</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setCategoryFilter('uncaught') }} active={categoryFilter === 'uncaught'}>Uncaught ({responseAll ? responseAll.count - caughtPokemons.length : 0})</Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </Col>
            </Row>
            <Row>
               {searchResults !== 0 ? ((searchInput === '' ? filteredResults : responseAll.results).map((pokemon, i) => pokemon.name.toLowerCase().startsWith(searchInput) ? <SingleCard key={i} pokemonId={pokemon.url.split('pokemon/')[1].substr(0, pokemon.url.split('pokemon/')[1].length - 1)} pokemonName={pokemon.name} categoryFilter={categoryFilter} setIsLoading={setIsLoading} lastCard={i === filteredResults.length - 1 ? true : false} mainData={{ responseAll: responseAll, filteredResults: filteredResults, sliceNumbers: sliceNumbers }}></SingleCard> : null)) : <h2 className='text-center py-4 text-danger'>No Pokémons found</h2>}
               {!buttonHidden && searchResults !== 0 && searchInput === '' ? <div className='text-center mb-5'>
                  <Button variant='primary' disabled={isLoadingButton} onClick={() => showMore()}>
                     {isLoadingButton ? (
                        <Spinner
                           as='span'
                           animation='grow'
                           size='sm'
                           role='status'
                           aria-hidden='true'
                        />
                     ) : null} Show more
                  </Button>
               </div> : null}

            </Row>
         </div>
      </React.Fragment >

   )
}

export default CardList