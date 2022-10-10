import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Row, Spinner } from 'react-bootstrap';
import SingleCard from '../SingleCard/SingleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { RefreshedPageContext, SearchContext } from '../../../App';
import $ from 'jquery';

const CardList = () => {

   const location = useLocation();
   const { refreshedOrFirstAccess, setRefreshedOrFirstAccess } = useContext(RefreshedPageContext);

   const { searchInput, setSearchInput } = useContext(SearchContext);

   const [isLoading, setIsLoading] = useState(true);
   const [isLoadingButton, setIsLoadingButton] = useState(false);
   const [responseAll, setResponseAll] = useState({});
   const [defaultResults, setDefaultResults] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.defaultResults : []);
   const [filteredResults, setFilteredResults] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.filteredResults : []);
   const [categoryFilter, setCategoryFilter] = useState(location.state && !refreshedOrFirstAccess ? location.state.categoryFilter : 'all')
   /* const [page, setPage] = useState(location.state && !refreshedOrFirstAccess ? location.state.mainData.page : null); */
   const [sliceNumbers, setSliceNumbers] = useState([0, 20])



   useEffect(() => {
      filterPokemons(categoryFilter)
   }, [categoryFilter])


   console.log('location.state', location.state)
   console.log('refreshedOrFirstAccess', refreshedOrFirstAccess)
   console.log('categoryFilter', categoryFilter)

   useEffect(() => {
      setFilteredResults((prevState) => prevState.concat(defaultResults.slice(sliceNumbers[0], location.state && !refreshedOrFirstAccess ? 0 : sliceNumbers[1])))
   }, [sliceNumbers])

   const showMore = () => {
      setSliceNumbers([sliceNumbers[0] + 20, sliceNumbers[1] + 20]);
      filterPokemons(categoryFilter)
   }


   useEffect(() => {
      if (refreshedOrFirstAccess) {
         setIsLoadingButton(true)

         console.log('SONO NELLA CHIAMATA SBAGLIATA 2')

         fetch('https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0')
            .then((responseAllPokemons) => responseAllPokemons.json())
            .then((allPokemonsData) => (setResponseAll(allPokemonsData), setDefaultResults(allPokemonsData.results), setFilteredResults(allPokemonsData.results.slice(sliceNumbers[0], sliceNumbers[1]))))
            .then(() => /* setTimeout(() => { */setIsLoadingButton(false), setRefreshedOrFirstAccess(false) /* }, 1000) */)
      }
   }, [])

   let caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons'));

   const filterPokemons = (category) => {

      switch (category) {
         case 'all':
            setFilteredResults(defaultResults.slice(0, sliceNumbers[1]))
            break;
         case 'caught':
            setFilteredResults(defaultResults.filter(pokemon => caughtPokemons.includes(pokemon.name)).slice(0, sliceNumbers[1]));
            break;
         case 'uncaught':
            setFilteredResults(defaultResults.filter(pokemon => !caughtPokemons.includes(pokemon.name)).slice(0, sliceNumbers[1]));
            break;
         default:
            break;
      }

   }

   console.log('CARDLIST data', responseAll)
   console.log('CARDLIST defaultResults', defaultResults)
   console.log('CARDLIST filteredResults', filteredResults)


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
                  <h1 className='text-uppercase'>All pokémons</h1>
               </Col>
               <Col xs={4} className='d-flex align-items-center justify-content-end'>
                  <Dropdown>
                     <Dropdown.Toggle variant='outline-primary'>
                        <FontAwesomeIcon icon={faFilter} /> Filters
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setCategoryFilter('all')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter('caught')}>Caught</Dropdown.Item>
                        <Dropdown.Item onClick={() => setCategoryFilter('uncaught')}>Uncaught</Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
               </Col>
            </Row>
            <Row>
               {(filteredResults.map((pokemon, i) => pokemon.name.toLowerCase().includes(searchInput) ? <SingleCard key={i} pokemonId={pokemon.url.split('pokemon/')[1].substr(0, pokemon.url.split('pokemon/')[1].length - 1)} pokemonName={pokemon.name} categoryFilter={categoryFilter} setIsLoading={setIsLoading} lastCard={i === filteredResults.length - 1 ? true : false} mainData={{ defaultResults: defaultResults, 'filteredResults': filteredResults }}></SingleCard> : null))}

               {/* {$('.single-card-body').length === 0 ? <p>No results</p> : null} */}
               
               <div className='text-center mb-5'>
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
               </div>
            </Row>
         </div>
      </React.Fragment >

   )
}

export default CardList