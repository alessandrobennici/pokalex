
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import React, { useState } from 'react';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export const RefreshedPageContext = React.createContext({
  refreshedOrFirstAccess: true,
  setRefreshedOrFirstAccess: () => { }
});

export const SearchContext = React.createContext();

function App() {

  const [refreshedOrFirstAccess, setRefreshedOrFirstAccess] = useState(true);
  const refreshedPage = { refreshedOrFirstAccess, setRefreshedOrFirstAccess };
  const [searchInput, setSearchInput] = useState('');

  let caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons')) || ['bulbasaur', 'squirtle', 'charmander']

  localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons))

  return (
    <React.Fragment>
      <SearchContext.Provider value={{searchInput, setSearchInput}}>
      <Header></Header>
      <RefreshedPageContext.Provider value={refreshedPage}>
        <Container className='mb-5 pb-4'>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/:pokemonName" element={<PokemonDetails />} />
          </Routes>
        </Container>
      </RefreshedPageContext.Provider>
      </SearchContext.Provider>
      <Footer></Footer>
    </React.Fragment >
  );
}

export default App;
