import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Row, Spinner } from 'react-bootstrap';
import SingleCard from '../SingleCard/SingleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const CardList = () => {

   const location = useLocation();

   const [isLoading, setIsLoading] = useState(false);
   const [responseAll, setResponseAll] = useState({});
   const [defaultResults, setDefaultResults] = useState([]);
   const [filteredResults, setFilteredResults] = useState([])
   const [categoryFilter, setCategoryFilter] = useState(location.state ? location.state.categoryFilter : 'all')
   /* const [count, setCount] = useState(0); */
   const [page, setPage] = useState(null);

   useEffect(() => {
      filterPokemons(categoryFilter)
   }, [categoryFilter, defaultResults])

   useEffect(() => {
      setIsLoading(true)
      fetch('https://pokeapi.co/api/v2/pokemon/' + (page ? page.split('/pokemon/')[1] : ''))
         .then((responseAllPokemons) => responseAllPokemons.json())
         .then((allPokemonsData) => (setResponseAll(allPokemonsData), setDefaultResults(r => r.concat(allPokemonsData.results)), setFilteredResults(r => r.concat(allPokemonsData.results))))
         .then(() => /* setTimeout(() => { */setIsLoading(false)/* }, 1000) */)
   }, [page])

   let caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons'));

   const filterPokemons = (category) => {

      switch (category) {
         case 'all':
            setFilteredResults(defaultResults)
            break;
         case 'caught':
            setFilteredResults(defaultResults.filter(pokemon => caughtPokemons.includes(pokemon.name)));
            break;
         case 'uncaught':
            setFilteredResults(defaultResults.filter(pokemon => !caughtPokemons.includes(pokemon.name)));
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
         <Row className='justify-content-between'>
            <Col xs={8}>
               <h1 className='text-uppercase mb-4'>All pokémons</h1>
            </Col>
            <Col xs={4} className='d-flex align-items-center justify-content-end'>
               <Dropdown>
                  <Dropdown.Toggle variant='warning' className='text-white'>
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
            {(filteredResults.map((pokemon, i) => <SingleCard key={i} pokemonId={pokemon.url.split('pokemon/')[1].substr(0, pokemon.url.split('pokemon/')[1].length - 1)} pokemonName={pokemon.name} categoryFilter={categoryFilter}></SingleCard>))}
            <div className='text-center mb-5'>
               <Button variant='primary' disabled={isLoading} onClick={() => setPage(responseAll['next'])}>
                  {isLoading ? (
                     <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                     />
                  ) : null} Mostra altri
               </Button>
            </div>
         </Row>
      </React.Fragment>
   )
}

export default CardList