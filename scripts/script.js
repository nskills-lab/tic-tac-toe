import {
  RANGES,
  playerFactory,
  loadPixels,
  drawCicle,
  drawX,
  generateAImove,
  clearGame,
  resetTiles,
  isBarCell,
  getRange,
} from "./ticTacToe.js";
const canvas = document.querySelector(".canvas");
const restart = document.querySelector("button[data-button-restart]");

loadPixels(canvas);
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

restart.addEventListener("click", (e) => {
  clearGame();
  resetTiles();
});

drawCicle(17, 1, 33, 17);
drawCicle(34, 34, 50, 50);

// Keep track of player moves
// generate AI's move
// decide who is the winner or if it is a draw
// show the winner (outlay)
// button restarts the game
