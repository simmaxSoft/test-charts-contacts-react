import React, { ReactElement, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
function testElement(){
  return (
    <>test</>
  )
}
export default function CovidMap(){
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<TMapMarker>();
  const [mapRef,setMapRef] = useState<google.maps.Map>()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB74HnFOasxoeK1GAzUWRZJB5iggJQy54I',
  });
    
  const { data } = useCovidCasesByCountry()

  const mapMarkers = useMemo(()=> 
    data?.map((c)=>({
      name:c.country,
      position: { 
        lat: c.countryInfo.lat,
        lng: c.countryInfo.long },
      active:c.active,
      cases:c.cases,
      deaths:c.deaths,
      recovered:c.recovered
  })),[data])

  function handleMarkerClick(event: google.maps.MapMouseEvent, data: TMapMarker){
    event.domEvent.stopPropagation()
    setInfoWindowData(data)
    mapRef?.panTo({ lat: data.position.lat, lng: data.position.lng });
    setIsOpen(true)
  }

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  return (
    <div className="w-full h-full mb-8">
      <h3 className="text-center my-4">Covid Map</h3>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          center = {{
            lat: 10.99835602,
            lng: 77.01502627
          }}
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
          mapContainerStyle={{width:'100%',height:'500px'}}
          zoom={2}
        >
          {mapMarkers?.length && mapMarkers?.map((c) => (
            <Marker
              key={c.name}
              position={c.position}  
              onClick={(event) => {handleMarkerClick(event,c)}}
              onMouseDown={()=> {setIsOpen(false)}}
            >
               {isOpen && infoWindowData?.name === c.name && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                  zIndex={1000}
                >
                   <>
                      <h3 className="text-center mb-2">{infoWindowData.name}</h3>
                      <p>Cases: {infoWindowData.cases}</p>
                      <p>Active: {infoWindowData.active}</p>
                      <p>Deaths: {infoWindowData.deaths}</p>
                      <p>Recovered: {infoWindowData.recovered}</p>
                      </>
                  </InfoWindow>
                  
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );

}

type TCovidCountry = { 
  cases: number,
  deaths: number,
  recovered: number,
  active: number,
  country: string,
  countryInfo: { lat: number, long: number}
}

type TMapMarker = {
  name:string,
  position: { 
    lat: number,
    lng: number 
  },
  active: number,
  cases: number,
  deaths: number,
  recovered: number
}

function useCovidCasesByCountry(){
  return useQuery({
    queryKey: ["covidCountryCases"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      return data as TCovidCountry[]
  },
})
}