import React from 'react';
import MapContainer from './components/MapContainer/MapContainer';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';

function App() {
  return (
    // <div className="App">
      <div className="App">
        <h1>Fellowship Progress</h1>
        {/* <MapContainer /> */}
        <Map />
      </div>
    // </div>
  );
}

export default App;
