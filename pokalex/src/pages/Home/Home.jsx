import React from 'react';
import CardList from '../../components/CardsList/CardList';

const Home = () => {
  return (
   <section id="pokemon-list">
      <h1 className='text-uppercase my-3'>All pokémons</h1>
      <CardList />
   </section>
  )
}

export default Home