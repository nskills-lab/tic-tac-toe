import {
  RANGES,
  TILES,
  playerFactory,
  gameboard,
  loadPixels,
  drawCicle,
  drawX,
  generateAImove,
  resetTiles,
  isBarCell,
  getRange,
} from "./ticTacToe.js";
const canvas = document.querySelector(".canvas");
const restart = document.querySelector("button[data-button-restart]");

loadPixels(canvas);
const playerHuman = playerFactory("Human");
const playerAI = playerFactory("AI");
const cells = document.querySelectorAll(".canvas > div");
cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    let xCoor = parseInt(cell.getAttribute("data-x-coordinate"));
    let yCoor = parseInt(cell.getAttribute("data-y-coordinate"));

    if (isBarCell(xCoor) || isBarCell(yCoor)) {
      return;
    }

    let xRange = RANGES[getRange(xCoor)];
    let x1 = xRange[0];
    let x2 = xRange[1];

    let yRange = RANGES[getRange(yCoor)];
    let y1 = yRange[0];
    let y2 = yRange[1];
    let tile = parseInt(cell.getAttribute("data-tile"));
    let currentHumanTilles = playerHuman.getMarkedTiles();

    if (currentHumanTilles.includes(tile)) {
      alert("The tile is already marked!");
      return;
    }
    drawX(x1, y1, x2, y2);
    playerHuman.saveTile(tile);
    gameboard.addMark(playerHuman.name, tile);

    console.log(gameboard.getGameBoard());
    let aiMove = generateAImove(gameboard.getGameBoard());
    playerAI.saveTile(aiMove);
    gameboard.addMark(playerAI, tile);
    let [xRangeAI, yRangeAI] = TILES[aiMove];
    let x1AI = xRangeAI[0];
    let x2AI = xRangeAI[1];
    let y1AI = yRangeAI[0];
    let y2AI = yRangeAI[1];
    drawCicle(x1AI, y1AI, x2AI, y2AI);
  })
);

restart.addEventListener("click", (e) => {
  playerHuman.clearTiles();
  resetTiles();
  gameboard.clearGameBoard();
});

// generate AI's move
// decide who is the winner or if it is a draw
// show the winner (outlay)
