import React, {useState, useEffect} from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'
import './App.css'

export const App = () => {

  const [earthquakeData, setEarthquakeData] = useState([])
  const [coordinates, setCoordinates] = useState([13.41, 52.52])
  const [description, setDescripton] = useState("")

  useEffect(() => {
    const getEarthquakeData = async () => {
      const now = new Date()
      const yesterday = new Date(now.getTime() - (24*60*60*1000)).toISOString() // now minus one day
      const URL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime=${yesterday}&limit=10`
      let response = await fetch(URL)
      let data = await response.json()
      setEarthquakeData(data.features)
      console.log(data.features)
    }
    getEarthquakeData()
  }, []);

  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiaGFidXJuNyIsImEiOiJjazM3bDhsajgwMGx0M25tbnV6cXlpMDViIn0.T1JDdvCjmfwGOtsW1xGIKw',
  })

  const setData = (earthquake) => {
    const coordinates = earthquake.geometry.coordinates.slice(0,2)
    setCoordinates(coordinates)
    const description = earthquake.properties.title
    setDescripton(description)
    console.log({coordinates, description})
  }

  return (
    <div className="App">
      <Map
        style="mapbox://styles/mapbox/satellite-streets-v10"
        center={coordinates}
        zoom={[6]}
        containerStyle={{
          height: '90vh',
          width: '90vw'
        }}>
        <Popup
          coordinates={coordinates}>
          <h2>{description}</h2>
          <h2>{coordinates[0]}, {coordinates[1]}</h2>
        </Popup>
      </Map>
      {(earthquakeData) ? <button onClick={() => setData(earthquakeData[0])}>Button</button> : null}
    </div>
  )
}
