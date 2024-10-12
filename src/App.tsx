import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';
import { fetchMembersCSV } from './Util/FetchService';
import Members from './components/Members/Members';

function App() {
  const [membersCsv, setMembersCsv] = useState<any>('');

  useEffect(() => {
    fetchMembersCSV(setMembersCsv, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1W4kwRYaGYKGPfC5dIAHhtVkSI8CWhowpxuut0LCNJXXrVMQEFKpK64TXyi7GlSHETxRWc-dlKwlt/pub?output=csv');
  });

  return (
    // <div className="App">
      <div className="App">
        <h1>Fellowship Progress</h1>
        <Map />
        {/* <Members /> */}
      </div>
    // </div>
  );
}

export default App;
