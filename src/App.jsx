import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all'

import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cocktails from './components/Cocktails';
import About from './components/About';
import Art from './components/Art';

gsap.registerPlugin(ScrollTrigger,SplitText);


const App = () => {
  return (
    
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <About/>
      <Art/>
    </main>
  )
}

export default App