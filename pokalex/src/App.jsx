
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import React, { useContext, useEffect, useState } from 'react';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import { Container, Spinner } from 'react-bootstrap';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export const MyContext = React.createContext();
export const useStateValue = () => useContext(MyContext);

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [pokemonTypes, setPokemonTypes] = useState({});

  useEffect(() => {
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/type')
      .then((responsePokemonTypes) => responsePokemonTypes.json())
      .then((dataPokemonTypes) => (setPokemonTypes(dataPokemonTypes)))
      .then(setIsLoading(false))
  }, [])

  let caughtPokemons = ['bulbasaur', 'charmander']

  localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons))

  /* let test = JSON.parse(localStorage.getItem('caughtPokemons'))
  test.push('ivysaur')
  localStorage.setItem('caughtPokemons', JSON.stringify(test)) */

  if (isLoading) {
    return (
      <React.Fragment>
        <div id="full-page-spinner" className='d-flex justify-content-center align-items-center'>
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      </React.Fragment>
    )
  }


  return (
    <React.Fragment>
      <Header></Header>
      <MyContext.Provider value={pokemonTypes.results}>
        <Container className='mb-5'>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/:pokemonName" element={<PokemonDetails />} />
          </Routes>
        </Container>
      </MyContext.Provider>
      <Footer></Footer>
    </React.Fragment >
  );
}

export default App;
