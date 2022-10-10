import React from 'react'
import { Badge } from 'react-bootstrap';

const PokemonTypes = ({ pokemonData, renderInSingleCard }) => {

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
         case 'bug':
         case 'grass':
            variant = 'success';
            break;
         case 'rock':
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

   let moreThanOneType = pokemonData ? pokemonData.types.length > 1 : false;

   return (
      pokemonData ? pokemonData.types.map((pokemonType, i) => (
         <Badge key={i} bg={pickVariant(pokemonType.type.name)} className={`type-badge${moreThanOneType ? i : ''} ${renderInSingleCard ? 'type-badge-singlecard' : ''} badge bg-primary d-inline-block py-2 text-uppercase`}>{pokemonType.type.name}</Badge>
      )) : null
   )
}

export default PokemonTypes