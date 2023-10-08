 function calculateCirclePoints(mainX, mainY, otherX, otherY) {
    let radius = Math.sqrt(Math.pow(otherY - mainY, 2) + Math.pow(otherX - mainX, 2));
    let numPoints = 60; // You can adjust the number of points as needed
    let circlePoints = [];

    for (let i = 0; i < numPoints; i++) {
        let angle = (i / numPoints) * 2 * Math.PI;
        let x = mainX + radius * Math.cos(angle);
        let y = mainY + radius * Math.sin(angle);
        circlePoints.push({ x, y });
    }
    return circlePoints;
}
export default calculateCirclePoints;