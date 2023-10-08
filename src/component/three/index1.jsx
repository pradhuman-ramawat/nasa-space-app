import { Environment, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Car from "./car";
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sphere, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Ecliptic from "./Ecliptic";
import calculateDistance from './calculateDistance';
import calculateCirclePoints from './calculateCirclePoints';

export default function Three() {
    
    let [sunY,setSunY] = useState(0);
    let [sunX,setSunX] = useState(0);
    let [sunZ,setSunZ] = useState(0);
    let [earthX,setEarthX] = useState(2);
    let [earthY,setEarthY] = useState(0);
    let [earthZ,setEarthZ] = useState(0);
    let [moonX,setMoonX] = useState(2.4);
    let [moonY,setMoonY] = useState(0);
    let [moonZ,setMoonZ] = useState(0);
    // let [moonCorX,setMoonCorX] = useState(null);
    // let [moonCorY,setMoonCorY] = useState(null);
    let [moonCor, setMoonCor] = useState(null);
    let [curIdx, setCurIdx] = useState(0);

    useEffect(() => {
        const obj = calculateCirclePoints(earthX,earthY,moonX,moonY); 
        console.log(obj);
        setMoonCor(obj);
    }, [])

    

    return (
        <>
            <Html>
                <h1 color="white" onClick={() => {
                    setCurIdx(curIdx == 0 ? 59 : (curIdx - 1) % 60);
                    setMoonX(moonCor[curIdx].x);
                    setMoonZ(moonCor[curIdx].y);
                }        
                }>Right</h1>
                <h1 color="white" onClick={() => {
                    setCurIdx((curIdx + 1) % 60);
                    setMoonX(moonCor[curIdx].x);
                    setMoonZ(moonCor[curIdx].y);
                }
                }>Left</h1>
            </Html>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0,1,3]}/>
            <OrbitControls/>
        //Sun
        <mesh position={[sunX,sunY,sunZ]} castShadow receiveShadow>
            <sphereGeometry args={[0.5, 64, 64]}></sphereGeometry>
            <meshStandardMaterial color="#ff0000"></meshStandardMaterial>
        </mesh>

        //Moon
        <mesh position={[moonX,moonY,moonZ]} castShadow receiveShadow>
            <sphereGeometry args={[0.10, 64, 64]}></sphereGeometry>
            <meshStandardMaterial color="#ffffff"></meshStandardMaterial>
        </mesh>
        {/* <Ecliptic xRadius={2} zRadius={2.4}/> */}
        <Ecliptic xRadius={calculateDistance(earthX, earthY, moonX, moonY)} zRadius={calculateDistance(earthX, earthY, moonX, moonY)} center={{x:earthX, y:earthY, z:earthZ}}/>
        

        //Earth
        <mesh position={[earthX,earthY,earthZ]} castShadow receiveShadow>
            <sphereGeometry args={[0.25, 64, 64]}></sphereGeometry>
            <meshStandardMaterial color="#0000ff"></meshStandardMaterial>
        </mesh>
        <Ecliptic xRadius={2} zRadius={2} center={{x:sunX, y:sunY, z:sunZ}}/>
        {/* <Atom /> */}
        {/* <mesh rotation={[-(angleToRadians(90)),0,0]}>
            <planeGeometry args={[7,7]}/>
            <meshStandardMaterial color="#0000ff"/>
    </mesh> */}
        <ambientLight args={["#ffffff",0.10]}/>
        {/* <pointLight  args={["ffffff", 1, 0, 2]} position={[0.0, 0, 0]} castShadow/> */}
                <pointLight  args={["ffffff", 1, 0, 2]} position={[0.5, 0, 0]} castShadow/>
                <pointLight  args={["ffffff", 1, 0, 2]} position={[-0.5, 0, 0]} castShadow/>
                <pointLight  args={["ffffff", 1, 0, 2]} position={[0, 0, 0.5]} castShadow/>
                <pointLight  args={["ffffff", 1, 0, 2]} position={[0, 0, -0.5]} castShadow/>
                <pointLight  args={["ffffff", 1, 0, 2]} position={[0, 0.5, 0]} castShadow/>
                <pointLight  args={["ffffff", 1, 0, 2]} position={[0, -0.5, 0]} castShadow/>


                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[1, 0, 0]} castShadow/>
                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[-1, 0, 0]} castShadow/>
                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[0, 1, 0]} castShadow/>
                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[0, -1, 0]} castShadow/>
                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[0, 0, 1]} castShadow/>
                <pointLight  args={["ffffff", 2, 2.5, 2]} position={[0, 0, -1]} castShadow/>

        </>
    )
}