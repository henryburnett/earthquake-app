import React, {useState, useEffect} from 'react'
import ReactMapboxGl, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl'
import styled from 'styled-components'
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
    console.log({earthquake})
    const coordinates = earthquake.geometry.coordinates.slice(0,2)
    const title = earthquake.properties.title
    console.log({coordinates, title})
    setCoordinates(coordinates)
    setDescripton(title)
  }

  return (
    <div className="App">
      <OptionsList>
      {
        (earthquakeData) ?
          earthquakeData.map(earthquake => {
            const title = earthquake.properties.title
            console.log({title})
            return (<ListItem
                    key={title}
                    onClick={() => setData(earthquake)}>
                      {title}
                    </ListItem>
                    )
          }) : null
      }
      </OptionsList>
      <MapWrapper id="mapWrapper">
        <Map
          style="mapbox://styles/mapbox/satellite-streets-v10"
          center={coordinates}
          zoom={[6]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>
          <Popup
            coordinates={coordinates}>
            <h2>{description}</h2>
            <h2>{coordinates[0]}, {coordinates[1]}</h2>
          </Popup>

          <ZoomControl/>
        </Map>
      </MapWrapper>
      {(earthquakeData) ? <button onClick={() => setData(earthquakeData[0])}>Button</button> : null}
    </div>
  )
}


const ListItem = styled.div`
    height: 10vh;
    width: 25vw;
    background-color: blue;
    border: 2px solid white;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    color: white;
`

const OptionsList = styled.div`
  position: absolute;
  left: 0;
  height: 100vh;
  width: 25vw;
  background-color: red;
  z-index: 2;
`

const MapWrapper = styled.div`
  z-index: 1;
`