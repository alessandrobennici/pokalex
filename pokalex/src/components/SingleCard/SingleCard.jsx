import React from 'react';
import { Card } from 'react-bootstrap';


const SingleCard = (props) => {
  
  let imgSrg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + props.pokemonId + '.png';

  return (
    <Card className='col-6 col-md-3' border='0'>
      <Card.Img variant="top" src={imgSrg} style={{'maxHeight': '200px', 'maxWidth': '200px'}}></Card.Img>
      <Card.Body>
         <Card.Text className='mb-4'>
            {props.pokemonName}
         </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SingleCard