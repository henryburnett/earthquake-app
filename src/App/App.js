import React, {useState, useEffect} from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import './App.css'

export const App = () => {

  const [earthquakeData, setEarthquakeData] = useState([])

  useEffect(() => {
    const getEarthquakeData = async () => {
      const time = new Date()
      const URL = `https://earthquake.usgs.gov/fdsnws/event/1/format=geojson&orderby=magnitude&starttime=${time}`
      let response = await fetch(URL)
      let data = await response.json()
      setEarthquakeData(data)
      console.log({data})
    }
    getOptions()
  }, []);

  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiaGFidXJuNyIsImEiOiJjazM3bDhsajgwMGx0M25tbnV6cXlpMDViIn0.T1JDdvCjmfwGOtsW1xGIKw',
  })

  return (
    <div className="App">
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '90vh',
          width: '90vw'
        }}>
      <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
  </Map>
    </div>
  )
}
