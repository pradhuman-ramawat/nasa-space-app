//Partial Solar Eclipse

import React, { useState } from 'react'
import Three from '.';

export default function Level2() {
    const [wSun,setWSun] = useState({x:0,y:0,z:0});
    const [wEarth,setWEarth] = useState({x:4,y:0,z:0});
    const [wMoon1, setWMoon1] = useState({x:3.7,y:0,z:0});
    const [wMoon2, setWMoon2] = useState({x:3.7,y:0,z:0})
    const initPos = {
        sun: {x:0,y:0,z:0},
        earth: {x:4,y:0,z:0},
        moon: {x:4.3,y:0,z:0}
    }

    function isWinning({sun,earth,moon}){
        const isSunWinning = (
            sun.x.toFixed(2) === wSun.x.toFixed(2) &&
            sun.y.toFixed(2) === wSun.y.toFixed(2) &&
            sun.z.toFixed(2) === wSun.z.toFixed(2)
        );
    
        const isEarthWinning = (
            earth.x.toFixed(2) === wEarth.x.toFixed(2) &&
            earth.y.toFixed(2) === wEarth.y.toFixed(2) &&
            earth.z.toFixed(2) === wEarth.z.toFixed(2)
        );
    
        const isMoonWinning = (
            (moon.x.toFixed(2) === wMoon1.x.toFixed(2) &&
            moon.y.toFixed(2) === wMoon1.y.toFixed(2) &&
            moon.z.toFixed(2) === wMoon1.z.toFixed(2))
            ||
            (moon.x.toFixed(2) === wMoon2.x.toFixed(2) &&
            moon.y.toFixed(2) === wMoon2.y.toFixed(2) &&
            moon.z.toFixed(2) === wMoon2.z.toFixed(2) 
            )
        );
    
        return isSunWinning && isEarthWinning && isMoonWinning;
    }

   return (    
    <>
        <Three initPos={initPos} isWinning={isWinning}/>
    </>
  )
}
