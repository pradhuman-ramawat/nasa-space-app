import React from 'react'
import * as THREE from "three";
export function Ecliptic({ xRadius = 1, zRadius = 1, center = { x: 0, y: 0, z: 0 } }) {
    const points = [];
        for (let index = 0; index < 64; index++) {
          const angle = (index / 64) * 2 * Math.PI;
          const x = center.x + xRadius * Math.cos(angle);
          const y = center.y;
          const z = center.z + zRadius * Math.sin(angle);
          points.push(new THREE.Vector3(x, y, z));
        }
        points.push(points[0]);
        // setMoonCor(points);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line geometry={lineGeometry}>
            <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={50} />
          </line>
        );
}
