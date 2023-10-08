import React from 'react'

export default function Moon({pos}) {
  return (
    <mesh position={[pos.x,pos.y,pos.z]} castShadow receiveShadow>
            <sphereGeometry args={[0.08, 64, 64]}></sphereGeometry>
            <meshStandardMaterial color="#ffffff"></meshStandardMaterial>
    </mesh>
  )
}
