import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Row, Spinner } from 'react-bootstrap';
import SingleCard from './SingleCard/SingleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const CardList = () => {  

   const [isLoading, setIsLoading] = useState(false);
   const [responseAll, setResponseAll] = useState({});
   const [results, setResults] = useState([]);
   /* const [count, setCount] = useState(0); */
   const [page, setPage] = useState(null);

   useEffect(() => {
      setIsLoading(true)
      fetch('https://pokeapi.co/api/v2/pokemon/' + (page ? page.split('/pokemon/')[1] : ''))
         .then((responseAllPokemons) => responseAllPokemons.json())
         .then((dataAllPokemons) => (setResponseAll(dataAllPokemons), setResults(r => r.concat(dataAllPokemons.results))))
         .then(() => /* setTimeout(() => { */setIsLoading(false)/* }, 1000) */)
   }, [page])

   /*  useEffect(() => {
 
    }) */


   /* const [] = useState(0)

   useEffect(() => {

   }) */




   return (
      <React.Fragment>
         <Row className='justify-content-between'>
            <Col xs={8}>
               <h1 className='text-uppercase my-3'>All pokémons</h1>
            </Col>
            <Col xs={4} className='d-flex align-items-center justify-content-end'>
               <Dropdown>
                  <Dropdown.Toggle variant='warning' className='text-white'>
                     <FontAwesomeIcon icon={faFilter} /> Filters
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                     <Dropdown.Item /* onClick={} */>All</Dropdown.Item>
                     <Dropdown.Item /* onClick={} */>Caught</Dropdown.Item>
                     <Dropdown.Item /* onClick={} */>Uncaught</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Col>
         </Row>
         <Row>
            {(results.map((pokemon, i) => <SingleCard key={pokemon.url} pokemonId={pokemon.url.split('pokemon/')[1].substr(0, pokemon.url.split('pokemon/')[1].length - 1)} pokemonName={pokemon.name}></SingleCard>))}
            <div className='text-center'>
               <Button variant='primary' disabled={isLoading} onClick={() => setPage(responseAll['next'])}>
                  {isLoading ? (
                     <Spinner
                        as='span'
                        animation='grow'
                        size='sm'
                        role='status'
                        aria-hidden='true'
                     />
                  ) : null}

                  Mostra altri
               </Button>
            </div>
         </Row>
      </React.Fragment>
   )
}

export default CardList