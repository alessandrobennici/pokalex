import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import { MyContext, useStateValue } from '../../App';

const PokemonTypes = ({ pokemonData }) => {

   const [pokemonTypes, setPokemonTypes] = useState(useStateValue('MyContext'));
   console.log(pokemonTypes)


   /* useEffect(() => {
      fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
         .then((responseSinglePokemon) => responseSinglePokemon.json())
         .then((dataSinglePokemon) => (setPokemonTypes(dataSinglePokemon)))
   }, []) */


   const pickVariant = (pokemonType) => {

      let variant = '';
      
      switch (pokemonType) {
         case 'normal':
         case 'unknown':
         case 'steel':
            variant = 'secondary';
            break;
         case 'fire':
         case 'fighting':
         case 'bug':
         case 'dragon':
            variant = 'danger';
            break;
         case 'water':
         case 'ice':
            variant = 'primary';
            break;
         case 'ground':
         case 'grass':
            variant = 'success';
            break;
         case 'rock':
         case 'bug':
         case 'electric':
         case 'fairy':
            variant = 'warning';
            break;
         case 'poison':
         case 'ghost':
         case 'steel':
         case 'psychic':
         case 'dark':
         case 'shadow':
            variant = 'dark';
            break;

         default:
            variant = 'primary';
            break;
      }

      return variant
   }

   let moreThanOnePokemon = pokemonData.types.length > 1;

   return (
      pokemonData.types.map((pokemonType, i) => (
         <Badge key={i} bg={pickVariant(pokemonType.type.name)} className={`type-badge${moreThanOnePokemon ? i : ''} badge bg-primary d-inline-block py-3`}>{pokemonType.type.name}</Badge>
      ))
   )
}

export default PokemonTypes