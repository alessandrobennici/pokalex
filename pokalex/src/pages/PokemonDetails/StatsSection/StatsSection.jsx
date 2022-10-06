import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const StatsSection = () => {
   return (
      <React.Fragment>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>HP</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='success' />
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>ATK</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='danger' />
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>DEF</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='primary' />
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>SP. ATK</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='dark' />
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>SP. DEF</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='info' />
         </div>
         <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
            <p className='mb-0 w-25'>SPEED</p>
            <ProgressBar now={60} label={`${60}%`} className='ms-3 w-100' variant='warning' />
         </div>
      </React.Fragment>
   )
}

export default StatsSection