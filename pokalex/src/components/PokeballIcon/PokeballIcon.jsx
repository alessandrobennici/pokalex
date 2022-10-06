import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import pokeballCaughtIcon from '../../assets/img/pokeball-caught.png';
import pokeballUncaughtIcon from '../../assets/img/pokeball-uncaught.png';


const PokeballIcon = ({isCaught}) => {



   return (
      <LazyLoadImage src={isCaught ? pokeballCaughtIcon : pokeballUncaughtIcon} width={24} height={24} alt={'Pokeball icon'} className='float-end'></LazyLoadImage>
   )
}

export default PokeballIcon