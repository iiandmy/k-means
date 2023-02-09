import { avgOfPoints, calculateClosestPoint, clearCanvas, delay, generateRandomColor, getRandomPoints, getRandomPointsInRange } from "./utils.js";
import { clusterPointRadius, distanceMeasurementError, measurementDelay } from "./constants.js";

let prepareButton = document.getElementById("prepare-btn");
let runAlgorithmButton = document.getElementById("run-btn");
let observationsInput = document.getElementById("observation-input");
let clustersInput = document.getElementById("clusters-input");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let observations = [];
let clusters = [];

canvas.width  = 800;
canvas.height = 500;
clearCanvas(canvas);

prepareButton.addEventListener('click', event => {
  prepare(observationsInput.value, clustersInput.value);
})

runAlgorithmButton.addEventListener('click', event => {
  run();
})

const renderObservations = (points) => {
  clearCanvas(canvas);

  points.forEach(point => {
    let closestClusterPoint = calculateClosestPoint(point, clusters)
    closestClusterPoint.observations.push(point)
    ctx.fillStyle = closestClusterPoint.color;
    ctx.fillRect(point.x, point.y, 1, 1);
  });
}

const renderClusters = (clusters) => {
  clusters.forEach(cluster => {
    ctx.fillStyle = cluster.color;
    ctx.beginPath();
    ctx.arc(cluster.point.x, cluster.point.y, clusterPointRadius, 0, Math.PI*2, false);
    ctx.fill();
  })
}

const prepare = (observationsQuantity, clustersQuantity) => {
  clusters = []
  observations = getRandomPoints(observationsQuantity);

  getRandomPointsInRange(clustersQuantity, {
    xLow: 0 + clusterPointRadius * 2,
    xHigh: canvas.width - clusterPointRadius * 2,
    yLow: 0 + clusterPointRadius * 2,
    yHigh: canvas.height - clusterPointRadius * 2
  }).forEach((point) => {
    clusters.push({
      point,
      color: generateRandomColor(),
      observations: []
    })
  })
  renderObservations(observations);
  renderClusters(clusters);
}

const run = async () => {
  let hasChanges;

  do {
    hasChanges = false
    clusters.forEach(cluster => {
      let newCoord = avgOfPoints(cluster.observations)
      if ((Math.abs(cluster.point.x - newCoord.x) >= distanceMeasurementError) || 
          (Math.abs(cluster.point.y - newCoord.y) >= distanceMeasurementError)) {
        hasChanges = true
      }
      cluster.point.x = newCoord.x;
      cluster.point.y = newCoord.y;
    })
    
    renderObservations(observations);
    renderClusters(clusters);
    await delay(measurementDelay)
  } while(hasChanges)
  alert("Done")
}
