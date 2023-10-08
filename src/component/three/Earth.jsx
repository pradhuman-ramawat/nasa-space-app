import { useLoader } from '@react-three/fiber';
import React from 'react'
import { useTexture } from '@react-three/drei';
export default function Earth({pos, radius}) {

  // const earthTexture = useTexture('../../utils/7MXox.jpg');
  return (
    
    <mesh position={[pos.x,pos.y,pos.z]} castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]}></sphereGeometry>
      <meshStandardMaterial color="#0099ff"></meshStandardMaterial>
    </mesh>
  )
}
