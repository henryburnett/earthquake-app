import React, {useState, useEffect} from 'react'
import ReactMapboxGl, { Popup, ZoomControl } from 'react-mapbox-gl'
import styled, {css} from 'styled-components'
import './App.css'

export const App = () => {

  const [earthquakeData, setEarthquakeData] = useState([])
  const [coordinates, setCoordinates] = useState([13.41, 52.52])
  const [description, setDescripton] = useState(null)

  useEffect(() => {
    const getEarthquakeData = async () => {
      const now = new Date()
      const yesterday = new Date(now.getTime() - (24*60*60*1000)).toISOString() // now minus one day
      const URL = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=magnitude&starttime=${yesterday}&limit=10`
      let response = await fetch(URL)
      let data = await response.json()
      setEarthquakeData(data.features)
    }
    getEarthquakeData()
  }, []);

  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiaGFidXJuNyIsImEiOiJjazM3bDhsajgwMGx0M25tbnV6cXlpMDViIn0.T1JDdvCjmfwGOtsW1xGIKw',
  })

  const setData = (earthquake) => {
    const coordinates = earthquake.geometry.coordinates.slice(0,2)
    const title = earthquake.properties.title
    setCoordinates(coordinates)
    setDescripton(title)
  }

  return (
    <div className="App">
      <Header><h2>Ten Strongest Earthquakes in the Last 24 Hours</h2></Header>
      <OptionsList>
      {
        (earthquakeData) ?
          earthquakeData.map(earthquake => {
            const title = earthquake.properties.title
            return (<ListItem
                    key={title}
                    selected={description === title}
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
            height: '88vh',
            width: '78vw'
          }}>
          {(description) ? 
          <Popup
            style={{opacity: 0.8}}
            coordinates={coordinates}>
            <h2>{description}</h2>
            <h2>Coordinates: <i>{coordinates[0]}, {coordinates[1]}</i></h2>
          </Popup> : null}

          <ZoomControl/>
        </Map>
      </MapWrapper>
    </div>
  )
}


const ListItem = styled.div`
    height: 8.5vh;
    width: 22vw;
    background-color: #0AB587;
    border: 1px solid gray;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    color: black;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background-color: #08916A;
    }

    ${props => props.selected && css`
        background-color: #08916A;
      `}
`

const OptionsList = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 88vh;
  width: 22vw;
  border-radius: 2px;
  z-index: 2;
`

const MapWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #0AB587;
  color: black;
  height: 12vh;
  font-size: 22px;
`