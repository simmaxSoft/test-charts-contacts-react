import { CovidChart, CovidMap } from '../components';
import React from 'react';

export default function ChartsAndMaps (){

  return (
    <div className="flex flex-col items-center w-full md:px-12">
    <h3 className='my-4'>Charts and Maps</h3>
      <CovidChart />
      <CovidMap />
    </div>
  )
}
