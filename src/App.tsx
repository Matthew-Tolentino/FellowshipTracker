import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';
import { fetchMembersCSV } from './Util/FetchService';
import Members from './components/Members/Members';
import { Member } from './Models/Member';
import { totalmem } from 'os';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    fetchMembersCSV(setMembers, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1W4kwRYaGYKGPfC5dIAHhtVkSI8CWhowpxuut0LCNJXXrVMQEFKpK64TXyi7GlSHETxRWc-dlKwlt/pub?output=csv');
  }, []);

  useEffect(() => {
    if (members.length > 0) {
      const totalMiles = members.map(m => m.totalDistance).reduce((p, c) => p + c, 0);
      const progPercent = totalMiles / 1800;
      console.log(totalMiles, progPercent);
      setProgress(progPercent);
    }
  }, [members]);

  return (
    <>
      <Members members={members}/>
      <div className="App p-background">        
        <Map progress={progress} members={members}/>
      </div>
    </>
  );
}

export default App;
