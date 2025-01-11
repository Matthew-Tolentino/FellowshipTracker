import React, { useEffect, useState } from 'react';
import Map from './components/Map/Map';
import './App.scss';
import './styles.scss';
import { fetchFellowshipCsv } from './Util/FetchService';
import Members from './components/Members/Members';
import Fellowship from './Util/Fellowship';
import FellowshipStats from './components/FellowshipStats/FellowshipStats';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SignIn, SignOut } from './Auth/Auth';

initializeApp({
  apiKey: "AIzaSyCH4oqvkcN3e64k-9gtFke81tVCiFRNTT8",
  authDomain: "fellowship-tracker-b857a.firebaseapp.com",
  projectId: "fellowship-tracker-b857a",
  storageBucket: "fellowship-tracker-b857a.firebasestorage.app",
  messagingSenderId: "934160763642",
  appId: "1:934160763642:web:91ab4e25b2959f254b9743",
  measurementId: "G-156BGKFEGF"
})

const auth = getAuth();
const firestore = getFirestore();

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

  const [user] = useAuthState(auth);

  return (
    <>
      <div className="App p-background">
          {
            user ?
            <>
              <Members members={fellowship.members}/>
              <FellowshipStats fellowship={fellowship}/>
              <Map progress={progress} members={fellowship.members}/>
              <SignOut />
            </>
            :
            <SignIn />
          }
      </div>
    </>
  );
}

export default App;
