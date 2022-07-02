const pixelId = "pixel";
const canvasSize = 50;
const sectionSize = Math.ceil(canvasSize / 3);
const firstRange = [1, 16];
const secondRange = [18, 33];
const thirdRange = [35, 50];
export const RANGES = {
  firstRange: firstRange,
  secondRange: secondRange,
  thirdRange: thirdRange,
};

export const playerFactory = (name) => {
  let marked = [];
  const saveTile = (tile) => {
    marked.push(tile);
  };
  const getMarkedTiles = () => marked;
  const clearTiles = () => (marked = []);
  return { name, getMarkedTiles, saveTile, clearTiles };
};

export function loadPixels(canvas) {
  for (let yCor = 1; yCor <= canvasSize; yCor++) {
    for (let xCor = 1; xCor <= canvasSize; xCor++) {
      let temp = document.createElement("div");
      temp.setAttribute("data-x-coordinate", xCor);
      temp.setAttribute("data-y-coordinate", yCor);
      let tile = 0;

      if (inRange(yCor, firstRange)) {
        if (inRange(xCor, firstRange)) {
          tile = 1;
        }
        if (inRange(xCor, secondRange)) {
          tile = 2;
        }
        if (inRange(xCor, thirdRange)) {
          tile = 3;
        }
      }

      if (inRange(yCor, secondRange)) {
        if (inRange(xCor, firstRange)) {
          tile = 4;
        }
        if (inRange(xCor, secondRange)) {
          tile = 5;
        }
        if (inRange(xCor, thirdRange)) {
          tile = 6;
        }
      }

      if (inRange(yCor, thirdRange)) {
        if (inRange(xCor, firstRange)) {
          tile = 7;
        }
        if (inRange(xCor, secondRange)) {
          tile = 8;
        }
        if (inRange(xCor, thirdRange)) {
          tile = 9;
        }
      }
      temp.setAttribute("data-tile", `${tile}`);
      canvas.appendChild(temp);
    }
  }
}

function inRange(number, range) {
  return range[0] <= number && number <= range[1];
}

export function getRange(number) {
  if (inRange(number, firstRange)) {
    return "firstRange";
  }
  if (inRange(number, secondRange)) {
    return "secondRange";
  }
  if (inRange(number, thirdRange)) {
    return "thirdRange";
  }
  return;
}

export function isBarCell(number) {
  return number == 17 || number == 34;
}

export function drawX(x1, y1, x2, y2) {
  let xStart = x1 + 3;
  let yStart = y1 + 3;
  let xEnd = x2 - 3;
  let yEnd = y2 - 3;

  for (let yCor = yStart, xCor = xStart; yCor <= yEnd; yCor++, xCor++) {
    colorOneGrid(xCor, yCor, "red");
  }

  for (let yCor = yStart, xCor = xEnd; yCor <= yEnd; yCor++, xCor--) {
    colorOneGrid(xCor, yCor, "red");
  }
}

function colorOneGrid(xCor, yCor, color) {
  let pixel = document.querySelector(
    `div[data-x-coordinate="${xCor}"][data-y-coordinate="${yCor}"]`
  );
  pixel.setAttribute("style", `background-color:${color}`);
  if (color === "cyan") {
    pixel.setAttribute("data-mark-circle", "cyan");
  } else if (color === "red") {
    pixel.setAttribute("data-mark-x", "red");
  }
}

export function drawCicle(x1, y1, x2, y2) {
  // Draw top and bottom of the circle
  let xTopStart = x1 + 7;
  let yTopStart = y1 + 3;
  let xTopEnd = xTopStart + 4;
  let yTopEnd = y2 - 4;

  for (
    let xCor = xTopStart, yCorTop = yTopStart, yCorEnd = yTopEnd;
    xCor <= xTopEnd;
    xCor++
  ) {
    colorOneGrid(xCor, yCorTop, "cyan");
    colorOneGrid(xCor, yCorEnd, "cyan");

    if (xCor === xTopStart) {
      colorOneGrid(xCor - 1, yCorTop + 1, "cyan");
      colorOneGrid(xCor - 1, yCorEnd - 1, "cyan");
    }
    if (xCor === xTopEnd) {
      colorOneGrid(xCor + 1, yCorTop + 1, "cyan");
      colorOneGrid(xCor + 1, yCorEnd - 1, "cyan");
    }
  }

  // Draw left and right of the circle
  let xLeftStart = xTopStart - 2;
  let xRightStart = xTopStart + 6;
  let ySideStart = yTopStart + 2;
  let ySideEnd = ySideStart + 5;
  for (
    let xLeftCor = xLeftStart, xRightCor = xRightStart, yCor = ySideStart;
    yCor <= ySideEnd;
    yCor++
  ) {
    colorOneGrid(xLeftCor, yCor, "cyan");
    colorOneGrid(xRightCor, yCor, "cyan");
  }
}

export function generateAImove() {}

const playerHuman = playerFactory("human");
const cells = document.querySelectorAll(".canvas > div");
cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    let xCor = parseInt(cell.getAttribute("data-x-coordinate"));
    let yCor = parseInt(cell.getAttribute("data-y-coordinate"));

    if (isBarCell(xCor) || isBarCell(yCor)) {
      return;
    }

    let xRange = RANGES[getRange(xCor)];

    let x1 = xRange[0];
    let x2 = xRange[1];
    let yRange = RANGES[getRange(yCor)];
    let y1 = yRange[0];
    let y2 = yRange[1];
    let tile = parseInt(cell.getAttribute("data-tile"));
    let currentHumanTilles = playerHuman.getMarkedTiles();
    if (!currentHumanTilles.includes(tile)) {
      drawX(x1, y1, x2, y2);
      playerHuman.saveTile(tile);
    } else {
    }
  })
);

export function clearGame() {
  playerHuman.clearTiles();
}

export function resetTiles() {
  const redPixels = document.querySelectorAll("div[data-mark-x]");
  const cyanPixels = document.querySelectorAll("div[data-mark-circle]");

  [...redPixels].forEach((pixel) =>
    pixel.setAttribute("style", "background-color:black")
  );
  [...cyanPixels].forEach((pixel) =>
    pixel.setAttribute("style", "background-color:black")
  );
}