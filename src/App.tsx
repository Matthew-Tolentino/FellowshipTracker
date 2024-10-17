import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';
import { fetchFellowshipCsv } from './Util/FetchService';
import Members from './components/Members/Members';
import Fellowship from './Util/Fellowship';
import FellowshipStats from './components/FellowshipStats/FellowshipStats';

function App() {
  const [fellowship, setFellowship] = useState<Fellowship>(new Fellowship());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchFellowshipCsv(setFellowship, 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1W4kwRYaGYKGPfC5dIAHhtVkSI8CWhowpxuut0LCNJXXrVMQEFKpK64TXyi7GlSHETxRWc-dlKwlt/pub?output=csv');
  }, []);

  useEffect(() => {
    if (fellowship.members.length > 0) {
      const totalMiles = fellowship.members.map(m => m.totalDistance).reduce((p, c) => p + c, 0);
      const progPercent = totalMiles / 1800;
      // console.log(totalMiles, progPercent);
      setProgress(progPercent);
    }
  }, [fellowship]);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();

    window.addEventListener('resize', setViewportHeight);

    return () => {
      window.removeEventListener('resize', setViewportHeight);
    };
  }, []);

  return (
    <>
      {/* <div className="App p-background">         */}
      <div className="App">        
        <Members members={fellowship.members}/>
        <FellowshipStats fellowship={fellowship}/>
        <Map progress={progress} members={fellowship.members}/>
      </div>
    </>
  );
}

export default App;
