import { CovidChart, CovidMap } from '../components';
import React from 'react';

export default function ChartsAndMaps (){

  return (
    <div className="flex flex-col items-center w-full md:px-12">
      <CovidChart />
      <CovidMap />
    </div>
  )
}
