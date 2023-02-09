import { canvasBackgroundColor } from "./constants.js";

export const checkNumericParams = (params) => {
  params.forEach(element => {
    if (!element.isNumeric()) {
      return false;
    }
  });
  return true;
};

export const getRandomIntInRange = (lowB, highB) => {
  return Math.floor((Math.random() * (highB - lowB)) + lowB)
}

export const getRandomPoint = (xLow, xHigh, yLow, yHigh) => {
  return {
    x: getRandomIntInRange(xLow, xHigh), 
    y: getRandomIntInRange(yLow, yHigh)
  };
};

export const getRandomPoints = (quantity) => {
  let result = []
  for (let i = 0; i < quantity; i++) {
    let point = getRandomPoint(0, canvas.width, 0, canvas.height);
    result.push(point);
  }
  return result;
};

export const getRandomPointsInRange = (quantity, borders) => {
  let result = [];
  for (let i = 0; i < quantity; i++) {
    let point = getRandomPoint(borders.xLow, borders.xHigh, borders.yLow, borders.yHigh);
    result.push(point);
  }
  return result;
}

export const clearCanvas = (canvas) => {
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export const calculateClosestPoint = (toPoint, fromPoints) => {
  let result = fromPoints[0];
  fromPoints.forEach(point => {
    if (calculateDistance(toPoint, result.point) > calculateDistance(toPoint, point.point)) {
      result = point;
    }
  })
  return result;
}

export const calculateDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export const avgOfPoints = (points) => {
  let sumX = 0, sumY = 0;
  points.forEach(point => {
    sumX += point.x;
    sumY += point.y;
  })
  return {
    x: sumX / points.length,
    y: sumY / points.length
  }
}

export const generateRandomColor = () => {
  let maxVal = 0xFFFFFF;
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`
}

export const delay = ms => new Promise(res => setTimeout(res, ms));
