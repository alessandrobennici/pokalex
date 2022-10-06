import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const PokemonDetails = () => {


  let params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon/' + params.pokemon)
      .then((responsePokemon) => responsePokemon.json())
      .then((dataPokemon) => console.log(dataPokemon))
      .then(() => /* setTimeout(() => { */setIsLoading(false)/* }, 1000) */)
  }, [])

  return (
    <div>{params.pokemon}</div>
  )
}

export default PokemonDetails