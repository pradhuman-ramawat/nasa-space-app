function calculateDistance(mainX, mainY, otherX, otherY){
    let radius = Math.sqrt(Math.pow(otherY - mainY, 2) + Math.pow(otherX - mainX, 2));
    return radius;
}