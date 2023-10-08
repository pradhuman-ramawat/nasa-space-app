import React from 'react'

export default function Sun({pos}) {
  return (
    <mesh position={[pos.x,pos.y,pos.z]} castShadow receiveShadow>
            <sphereGeometry args={[0.5, 64, 64]}></sphereGeometry>
            <meshStandardMaterial color="#ff0000"></meshStandardMaterial>
    </mesh>
  )
}
