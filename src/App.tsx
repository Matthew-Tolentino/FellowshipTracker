import React from 'react';
import MapContainer from './components/MapContainer/MapContainer';
import Map from './components/Map/Map';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="App">
        <h1>Interactive Map with Path Drawing</h1>
        {/* <MapContainer /> */}
        <Map />
      </div>
    </div>
  );
}

export default App;
