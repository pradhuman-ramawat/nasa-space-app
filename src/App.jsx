import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css'
import Three from './component/three';
import { Float, Line, Sphere, Stars } from '@react-three/drei'
import Level1 from './component/three/Level1';
import Level2 from './component/three/Level2';

function App() {

  return (
    <>
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={<></>}>
        <Level1 />       
        <Stars /> 
      </Suspense>
    </Canvas>
    </>

  )
}

export default App
