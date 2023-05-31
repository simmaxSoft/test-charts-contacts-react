import React, { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';


export default function CovidChart(){
  const { data:covidCasesData } = useCovidCases()
  const [inactiveLegends,setInactiveLegends] = useState<string[]>([])

  const dates = useMemo(()=> Object.keys(covidCasesData?.cases || {}),[covidCasesData])
  const chartData = useMemo(()=> 
     dates.map(d => ({
      date:d,
      cases: covidCasesData?.cases[d],
      deaths: covidCasesData?.deaths[d],
      recovered: covidCasesData?.recovered[d] === -1 ? 0 : covidCasesData?.recovered[d]
    })
  ),[dates])

  function handleOnLegendClick(event: Payload){
    setInactiveLegends(prev => prev.includes(event.value) ? prev.filter(d => d!== event.value) : [...prev,event.value])
  }

  return (
    <>
    <h3 className='my-4'>Covid Chart</h3>
      <div className='w-[800px] h-[500px]'>
        {chartData 
          ? ( <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart
          width={800}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 50,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={15} offset={100}/>
          <YAxis domain={[0, 'dataMax']} tickFormatter={(v: number) => v.toLocaleString()}/>
          <Tooltip />
          <Legend onClick={handleOnLegendClick} wrapperStyle={{ cursor: 'pointer' }}/>
          <Line type="monotone" dataKey="cases" stroke="#820011" hide={inactiveLegends.includes('cases')} dot={false}/>
          <Line type="monotone" dataKey="deaths" stroke="#121212" hide={inactiveLegends.includes('deaths')}  dot={false}/>
          <Line type="monotone" dataKey="recovered" stroke="#82ca9d" hide={inactiveLegends.includes('recovered')}  dot={false}/>
        </LineChart>
      </ResponsiveContainer>
      ) : (<>Loading...</>)}
      </div>
    </>
  )
}

function useCovidCases(){
  return useQuery({
    queryKey: ["covidCases"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      return data as { cases: { [key in string]: number}, deaths: {[key in string]: number}, recovered:{[key in string]: number}};
    },
  });
}