const width = screen.width;
const height = screen.height;
const canvas = document.querySelector(".canvas");
const pixelId = "pixel";
const canvasSize = 50;
const sectionSize = Math.ceil(canvasSize / 3);
const firstRange = [1, 16];
const secondRange = [18, 33];
const thirdRange = [35, 50];
const ranges = {
  firstRange: firstRange,
  secondRange: secondRange,
  thirdRange: thirdRange,
};

function loadPixels() {
  for (let yCor = 1; yCor <= canvasSize; yCor++) {
    for (let xCor = 1; xCor <= canvasSize; xCor++) {
      let temp = document.createElement("div");
      temp.setAttribute("data-x-coordinate", xCor);
      temp.setAttribute("data-y-coordinate", yCor);
      let quadrant = 0;

      if (inRange(yCor, firstRange)) {
        if (inRange(xCor, firstRange)) {
          quadrant = 1;
        }
        if (inRange(xCor, secondRange)) {
          quadrant = 2;
        }
        if (inRange(xCor, thirdRange)) {
          quadrant = 3;
        }
      }

      if (inRange(yCor, secondRange)) {
        if (inRange(xCor, firstRange)) {
          quadrant = 4;
        }
        if (inRange(xCor, secondRange)) {
          quadrant = 5;
        }
        if (inRange(xCor, thirdRange)) {
          quadrant = 6;
        }
      }

      if (inRange(yCor, thirdRange)) {
        if (inRange(xCor, firstRange)) {
          quadrant = 7;
        }
        if (inRange(xCor, secondRange)) {
          quadrant = 8;
        }
        if (inRange(xCor, thirdRange)) {
          quadrant = 9;
        }
      }
      temp.setAttribute("data-quadrant", `${quadrant}`);
      canvas.appendChild(temp);
    }
  }
}

function inRange(number, range) {
  return range[0] <= number && number <= range[1];
}

function getRange(number) {
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

function isBarCell(number) {
  return number == 17 || number == 34;
}

function drawX(x1, y1, x2, y2) {
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
    pixel.classList.add("cicle");
  } else if (color === "red") {
    pixel.classList.add("x");
  }
}

function drawCicle(x1, y1, x2, y2) {
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

loadPixels();
const cells = document.querySelectorAll(".canvas > div");
cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    let xCor = parseInt(cell.getAttribute("data-x-coordinate"));
    let yCor = parseInt(cell.getAttribute("data-y-coordinate"));

    if (isBarCell(xCor) || isBarCell(yCor)) {
      return;
    }
    console.log("not a bar cell");
    let xRange = ranges[getRange(xCor)];
    console.log(xRange);
    let x1 = xRange[0];
    let x2 = xRange[1];
    let yRange = ranges[getRange(yCor)];
    let y1 = yRange[0];
    let y2 = yRange[1];

    drawX(x1, y1, x2, y2);
  })
);

//drawX(1, 1, 17, 17);
//drawX(17, 17, 33, 33);

drawCicle(17, 1, 33, 17);
drawCicle(34, 34, 50, 50);

// Listen to the click and based on the player decide whether to draw x or circle

// Keep track of player moves
// generate AI's move
// decide who is the winner or if it is a draw
// show the winner (outlay)
// button restarts the game
