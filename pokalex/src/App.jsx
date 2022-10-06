
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Container className='mb-5'>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:pokemon" element={<PokemonDetails />} />
        </Routes>
      </Container>
      <Footer></Footer> 
    </React.Fragment>
  );
}

export default App;
