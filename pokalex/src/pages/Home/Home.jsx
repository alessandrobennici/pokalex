import React from 'react';
import { useLocation } from 'react-router-dom';
import CardList from './CardsList/CardList';

const Home = () => {

  const location = useLocation();
  const categoryFilter = location.state ? location.state.categoryFilter : 'all';

  return (
    <section id="pokemon-list">
      <CardList categoryFilter={categoryFilter} />
    </section>
  )
}

export default Home