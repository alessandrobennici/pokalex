import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import SingleCard from '../SingleCard/SingleCard';

const CardList = () => {

   const [isLoading, setIsLoading] = useState(false);
   const [responseAll, setResponseAll] = useState({});
   const [count, setCount] = useState(0);
   const [results, setResults] = useState([]);
   const [page, setPage] = useState(null);


   useEffect(() => {
      setIsLoading(true)
      fetch('https://pokeapi.co/api/v2/pokemon/' + (page ? page.split('/pokemon/')[1] : ''))
         .then((response) => response.json())
         .then((data) => (setResponseAll(data), setResults(results.concat(data.results)), setCount(data.count)))
      setIsLoading(false)
   }, [page])


   if (isLoading) {
      return <p>Loading...</p>
   }

   return (
      <React.Fragment>

         <React.Fragment>
            <Row>
               {results.map((elem, index) => <SingleCard key={elem.url} pokemonId={elem.url.split('pokemon/')[1].substr(0, elem.url.split('pokemon/')[1].length - 1)} pokemonName={elem.name}></SingleCard>)}
            </Row>
            <Button variant='primary' onClick={() => setPage(responseAll['next'])}>Mostra altri</Button>
         </React.Fragment>


      </React.Fragment >
   )
}

export default CardList