
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import { Container } from 'react-bootstrap';

function App() {





  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:pokemon" element={<PokemonDetails />} />
        </Routes>
      </Container>
    </React.Fragment>
  );
}

export default App;
