import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';
import { fetchMembersCSV } from './Util/FetchService';
import Members from './components/Members/Members';

function App() {
  const [members, setMembers] = useState<any>('');
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    fetchMembersCSV(setMembers, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1W4kwRYaGYKGPfC5dIAHhtVkSI8CWhowpxuut0LCNJXXrVMQEFKpK64TXyi7GlSHETxRWc-dlKwlt/pub?output=csv');
  }, []);

  return (
    <>
      <Members />
      <div className="App">        
        <Map progress={progress} members={members}/>
      </div>
    </>
  );
}

export default App;
