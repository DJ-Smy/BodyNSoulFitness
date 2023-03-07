import React from 'react'
import './Landing.css';
import Hero from './components/Hero/Hero';
import { Programs } from './components/Programs/Programs';
import { Reasons } from './components/Reasons/Reasons';

function Landing() {
  return (
    <div className="App">
          <Hero />
          <Programs />
          <Reasons />
    </div>
  )
}

export default Landing