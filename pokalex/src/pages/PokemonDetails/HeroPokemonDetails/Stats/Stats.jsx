import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const StatsSection = ({ pokemonData }) => {

   let allStatsValue = [pokemonData.stats[0].base_stat, pokemonData.stats[1].base_stat, pokemonData.stats[2].base_stat, pokemonData.stats[3].base_stat, pokemonData.stats[4].base_stat, pokemonData.stats[5].base_stat]
   let higherStat = Math.max( ...allStatsValue );

   return (
      <React.Fragment>
         <h2 className='mb-3 fw-bold'>Stats</h2>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[0].base_stat} label={`${pokemonData.stats[0].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">HP</p>
            </div>
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[1].base_stat} label={`${pokemonData.stats[1].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">ATK</p>
            </div>
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[2].base_stat} label={`${pokemonData.stats[2].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">DEF</p>
            </div>
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[3].base_stat} label={`${pokemonData.stats[3].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">SP. ATK</p>
            </div>
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[4].base_stat} label={`${pokemonData.stats[4].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">SP. DEF</p>
            </div>
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <ProgressBar now={pokemonData.stats[5].base_stat} label={`${pokemonData.stats[5].base_stat}`} max={higherStat > 250 ? higherStat : 250} className='w-100' variant='success' />
            <div className="w-25">
               <p className="mb-0 float-end">SPEED</p>
            </div>
         </div>
      </React.Fragment>
   )
}

export default StatsSection