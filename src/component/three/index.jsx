import { Environment, OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from "three";
import gsap from "gsap";
import Car from "./car";
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sphere, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Sun from "./Sun";
import Moon from "./Moon";
import Earth from "./Earth";
import { Ecliptic } from "./Ecliptic";

// function Atom(props){
//     const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
//   return (
//     <group {...props}>
//       <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
//       <Line worldUnits points={points} color="turquoise" lineWidth={0.3} rotation={[0, 0, 1]} />
//       <Line worldUnits points={points} color="turquoise" lineWidth={0.3} rotation={[0, 0, -1]} />
//       {/* <Electron position={[0, 0, 0.5]} speed={6} />
//       <Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} />
//       <Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} /> */}
//       <Sphere args={[0.55, 64, 64]}>
//         <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
//       </Sphere>
//     </group>
//   )
// }



// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//     const points = [];
//     for (let index = 0; index < 64; index++) {
//       const angle = (index / 64) * 2 * Math.PI;
//       const x = xRadius * Math.cos(angle);
//       const z = zRadius * Math.sin(angle);
//       points.push(new THREE.Vector3(x, 0, z));
//     }
  
//     points.push(points[0]);
//     console.log(points);
  
//     const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//     return (
//       <line geometry={lineGeometry}>
//         <lineBasicMaterial attach="material" color="#FFFFFF" linewidth={50} />
//       </line>
//     );
//   }

// function calculatePoints(mainX,
//     mainY,
//     otherX,
//     otherY) {
//     let radius = Math.sqrt(Math.pow(otherY - mainY, 2) + Math.pow(otherX - mainX, 2));
//     let stepping = radius / 15;
//     let otherXNew = [];
//     let otherYNew = [];
    
//     for (let otrY = otherY; otrY < otherY + radius; otrY += stepping) {
//         let otrX = Math.sqrt(Math.pow(radius, 2) - Math.pow(otrY - mainY, 2)) + mainX;
//         otherXNew.push(otrX);
//         otherYNew.push(otrY);
//     }
    
//     for (let otrY = otherY + radius; otrY > otherY; otrY -= stepping) {
//         let otrX =  mainX - Math.sqrt(Math.pow(radius, 2) - Math.pow(otrY - mainY, 2));
//         otherXNew.push(otrX);
//         otherYNew.push(otrY);
//     }
    
//     for (let otrY = otherY; otrY > otherY - radius; otrY -= stepping) {
//         let otrX = (Math.sqrt(Math.pow(radius, 2) - Math.pow(otrY - mainY, 2)) + mainX);
//         otherXNew.push(otrX);
//         otherYNew.push(otrY);
//     }
    
//     for (let otrY = otherY - radius; otrY < otherY; otrY += stepping) {
//         let otrX = Math.sqrt(Math.pow(radius, 2) - Math.pow(otrY - mainY, 2)) + mainX;
//         otherXNew.push(otrX);
//         otherYNew.push(otrY);
//     }

//     console.log(otherXNew.length);
//     return {x:otherXNew , y:otherYNew };
// }

export default function Three({initPos, isWinning}) {

    let [sun,setSun] = useState(0);
    // let [sunX,setSunX] = useState(0);
    // let [sunZ,setSunZ] = useState(0);
    // let [earthX,setEarthX] = useState(2);
    let [earth,setEarth] = useState(0);
    // let [earthZ,setEarthZ] = useState(0);
    let [moon,setMoon] = useState(2.4);
    // let [moonY,setMoonY] = useState(0);
    // let [moonZ,setMoonZ] = useState(0);
    // let [moonCorX,setMoonCorX] = useState(null);
    // let [moonCorY,setMoonCorY] = useState(null);
    let [moonCor, setMoonCor] = useState(null);
    let [curIdx, setCurIdx] = useState(0);
    let [earthMoonDist, setEarthMoonDist] = useState(0);
    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "ArrowLeft") {
            console.log("left");
            moveMoonLeft();
          } else if (event.key === "ArrowRight") {
            console.log("right");
            moveMoonRight();
          }
        }
        
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [curIdx]); // Dependency array ensures that the effect runs once when curIdx changes
    
    
    // Code to move the camera around
    // const orbitControlsRef = useRef(null);
    // useFrame((state) => {
    //     if (!!orbitControlsRef.current) {
    //         const { x, y } = state.mouse;
    //         orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
    //         orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
    //         orbitControlsRef.current.update();
    //     }
    // })

    // Animation
    // const ballRef = useRef(null);
    useEffect(() => {
        setSun(initPos.sun);
        setMoon(initPos.moon);
        setEarth(initPos.earth);
        // setSunY(initPos.sun.y);
        // setMoonY(initPos.moon.y);
        // setEarthY(initPos.earth.y);
        // setSunZ(initPos.sun.z);
        // setMoonZ(initPos.moon.z);
        // setEarthZ(initPos.earth.z);
        
        const obj = calculateCirclePoints(initPos.earth.x,initPos.earth.y,initPos.moon.x,initPos.moon.y); 
        const dist = calculateDistance(initPos.earth.x,initPos.earth.y,initPos.moon.x,initPos.moon.y);
        console.log(obj);
        console.log(dist);
        setMoonCor(obj);
        setEarthMoonDist(dist);
    }, [])

    function calculateCirclePoints(mainX, mainY, otherX, otherY) {
        let radius = Math.sqrt(Math.pow(otherY - mainY, 2) + Math.pow(otherX - mainX, 2));
        let numPoints = 30; // You can adjust the number of points as needed
        let circlePoints = [];
    
        for (let i = 0; i < numPoints; i++) {
            let angle = (i / numPoints) * 2 * Math.PI;
            let x = mainX + radius * Math.cos(angle);
            let y = mainY + radius * Math.sin(angle);
            circlePoints.push({ x, y });
        }
        return circlePoints;
    }
    
    function calculateDistance(mainX, mainY, otherX, otherY){
        let radius = Math.sqrt(Math.pow(otherY - mainY, 2) + Math.pow(otherX - mainX, 2));
        return radius;
    }
    
    // function Ecliptic({ xRadius = 1, zRadius = 1, center = { x: 0, y: 0, z: 0 } }) {
    //     const points = [];
    //     for (let index = 0; index < 64; index++) {
    //       const angle = (index / 64) * 2 * Math.PI;
    //       const x = center.x + xRadius * Math.cos(angle);
    //       const y = center.y;
    //       const z = center.z + zRadius * Math.sin(angle);
    //       points.push(new THREE.Vector3(x, y, z));
    //     }
    //     points.push(points[0]);
    //     // setMoonCor(points);
    //     const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    //     return (
    //       <line geometry={lineGeometry}>
    //         <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
    //       </line>
    //     );
    //   }
    const moveMoonRight = ()=>
    {
        setCurIdx(curIdx == 0 ? 29 : (curIdx - 1) % 30);
        setMoon({...moon,x:moonCor[curIdx].x, z:moonCor[curIdx].y});
        // setMoon({...moon,z:moonCor[curIdx].y});
        console.log(moon.x," ",moon.y," ",moon.z);
        if(isWinning({sun:sun,moon:moon,earth:earth}))
        {
            console.log("WINNNER");
        }
        else
            console.log("LOOSSSSSSe");
    }
    const moveMoonLeft = () =>  {
        setCurIdx((curIdx + 1) % 30);
                    setMoon({...moon,x:moonCor[curIdx].x, z:moonCor[curIdx].y});
                    // setMoonZ(moonCor[curIdx].y);
                    console.log(moon.x," ",moon.y," ",moon.z);
                    if(isWinning({sun:sun,moon:moon,earth:earth}))
                    {
                        console.log("WINNNER");
                    }
                    else
                        console.log("LOOSSSSSSe");

    }
    return (
        <>
            {/* <Html>
                <h1 color="white" onClick={moveMoonRight}>Right</h1>
                <h1 color="white" onClick={moveMoonLeft}>Left</h1>
            </Html> */}

            {/* Camera */}
            <PerspectiveCamera position={[0,1,2]} />
            <OrbitControls/>
            
        //Sun
        <Sun pos={sun}/>

        //Moon
        <Moon pos={moon}/>
       
        <Ecliptic xRadius={earthMoonDist} zRadius={earthMoonDist} center={{x:earth.x,y:earth.y,z:earth.z}}/>
        

        //Earth
        <Earth pos={earth} radius={0.2}/>
        <Ecliptic xRadius={4} zRadius={4} center={{x:sun.x,y:sun.y,z:sun.z}}/>
       
        
        {/* <pointLight  args={["ffffff", 1, 0, 2]} position={[0.0, 0, 0]} castShadow/> */}


        //Lighting
        <ambientLight args={["#ffffff",0.10]}/>


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