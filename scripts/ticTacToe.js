const canvasSize = 50;
const firstRange = [1, 16];
const secondRange = [18, 33];
const thirdRange = [35, 50];
export const RANGES = {
  firstRange: firstRange,
  secondRange: secondRange,
  thirdRange: thirdRange,
};

export const TILES = {
  1: [firstRange, firstRange],
  2: [secondRange, firstRange],
  3: [thirdRange, firstRange],
  4: [firstRange, secondRange],
  5: [secondRange, secondRange],
  6: [thirdRange, secondRange],
  7: [firstRange, thirdRange],
  8: [secondRange, thirdRange],
  9: [thirdRange, thirdRange],
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

export const gameboard = (() => {
  let gameboardMarks = {};
  const addMark = (player, tile) => (gameboardMarks[tile] = player);
  const clear = () => (gameboardMarks = {});
  const getCurrentMarks = () => gameboardMarks;
  const hasNoSpace = () => !(Object.keys(gameboardMarks).length < 9);
  return { addMark, clear, getCurrentMarks, hasNoSpace };
})();

export function loadPixels(canvas) {
  for (let yCoor = 1; yCoor <= canvasSize; yCoor++) {
    for (let xCoor = 1; xCoor <= canvasSize; xCoor++) {
      let temp = document.createElement("div");
      temp.setAttribute("data-x-coordinate", xCoor);
      temp.setAttribute("data-y-coordinate", yCoor);
      let tile = 0;

      if (inRange(yCoor, firstRange)) {
        if (inRange(xCoor, firstRange)) {
          tile = 1;
        }
        if (inRange(xCoor, secondRange)) {
          tile = 2;
        }
        if (inRange(xCoor, thirdRange)) {
          tile = 3;
        }
      }

      if (inRange(yCoor, secondRange)) {
        if (inRange(xCoor, firstRange)) {
          tile = 4;
        }
        if (inRange(xCoor, secondRange)) {
          tile = 5;
        }
        if (inRange(xCoor, thirdRange)) {
          tile = 6;
        }
      }

      if (inRange(yCoor, thirdRange)) {
        if (inRange(xCoor, firstRange)) {
          tile = 7;
        }
        if (inRange(xCoor, secondRange)) {
          tile = 8;
        }
        if (inRange(xCoor, thirdRange)) {
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

  for (let yCoor = yStart, xCoor = xStart; yCoor <= yEnd; yCoor++, xCoor++) {
    colorOneGrid(xCoor, yCoor, "red");
  }

  for (let yCoor = yStart, xCoor = xEnd; yCoor <= yEnd; yCoor++, xCoor--) {
    colorOneGrid(xCoor, yCoor, "red");
  }
}

function colorOneGrid(xCoor, yCoor, color) {
  let pixel = document.querySelector(
    `div[data-x-coordinate="${xCoor}"][data-y-coordinate="${yCoor}"]`
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
  let xTopStart = x1 + 5;
  let yTopStart = y1 + 3;
  let xTopEnd = xTopStart + 4;
  let yTopEnd = y2 - 4;

  for (
    let xCoor = xTopStart, yCoorTop = yTopStart, yCoorEnd = yTopEnd;
    xCoor <= xTopEnd;
    xCoor++
  ) {
    colorOneGrid(xCoor, yCoorTop, "cyan");
    colorOneGrid(xCoor, yCoorEnd, "cyan");

    if (xCoor === xTopStart) {
      colorOneGrid(xCoor - 1, yCoorTop + 1, "cyan");
      colorOneGrid(xCoor - 1, yCoorEnd - 1, "cyan");
    }
    if (xCoor === xTopEnd) {
      colorOneGrid(xCoor + 1, yCoorTop + 1, "cyan");
      colorOneGrid(xCoor + 1, yCoorEnd - 1, "cyan");
    }
  }

  // Draw left and right of the circle
  let xLeftStart = xTopStart - 2;
  let xRightStart = xTopStart + 6;
  let ySideStart = yTopStart + 2;
  let ySideEnd = ySideStart + 4;
  for (
    let xLeftCoor = xLeftStart, xRightCoor = xRightStart, yCoor = ySideStart;
    yCoor <= ySideEnd;
    yCoor++
  ) {
    colorOneGrid(xLeftCoor, yCoor, "cyan");
    colorOneGrid(xRightCoor, yCoor, "cyan");
  }
}

export function generateAImove(gameboardMoves) {
  let number = Math.floor(Math.random() * 9) + 1;
  while (gameboardMoves.hasOwnProperty(number)) {
    number = Math.floor(Math.random() * 9) + 1;
  }
  return number;
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

export function checkGame(gameboard) {
  let currentGameBoard = gameboard.getCurrentMarks();
  let winner = 0;

  // row check
  for (let count = 1; count <= 7; count += 3) {
    if (
      currentGameBoard[count] == currentGameBoard[count + 1] &&
      currentGameBoard[count] == currentGameBoard[count + 2]
    ) {
      winner = currentGameBoard[count];
      return winner;
    }
  }

  // column check
  for (let count = 1; count <= 3; count++) {
    if (
      currentGameBoard[count] == currentGameBoard[count + 3] &&
      currentGameBoard[count] == currentGameBoard[count + 6]
    ) {
      winner = currentGameBoard[count];
      return winner;
    }
  }

  // diagonal check

  for (let count = 1; count <= 3; count += 2) {
    if (
      currentGameBoard[count] == currentGameBoard[count + 4] &&
      currentGameBoard[count] == currentGameBoard[count + 8]
    ) {
      winner = currentGameBoard[count];
      return winner;
    }
    if (count === 3) {
      if (
        currentGameBoard[count] == currentGameBoard[count + 2] &&
        currentGameBoard[count] == currentGameBoard[count + 4]
      ) {
        winner = currentGameBoard[count];
        return winner;
      }
    }
  }

  return winner;
}

export function restartGame(playerHuman, playerAI, gameboard) {
  playerHuman.clearTiles();
  playerAI.clearTiles();
  gameboard.clear();
  resetTiles();
}
