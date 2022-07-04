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
  checkGame,
} from "./ticTacToe.js";
const canvas = document.querySelector(".canvas");
const restart = document.querySelector("button[data-button-restart]");

loadPixels(canvas);
const playerHuman = playerFactory("Human");
const playerAI = playerFactory("AI");
const cells = document.querySelectorAll(".canvas > div");

cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    if (gameboard.hasNoSpace()) {
      alert("It is a tie!");
      return;
    }

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
    let currentHumanTiles = playerHuman.getMarkedTiles();
    let currentAITiles = playerAI.getMarkedTiles();

    if (currentHumanTiles.includes(tile) || currentAITiles.includes(tile)) {
      alert("The tile is already marked!");
      return;
    }

    playerHuman.saveTile(tile);
    gameboard.addMark(playerHuman.name, tile);
    drawX(x1, y1, x2, y2);
    let winner = checkGame(gameboard);
    console.log(winner);

    if (winner) {
      setTimeout(() => {
        alert(`Winner: ${winner}!`);
      }, 1);
      return;
    }

    if (gameboard.hasNoSpace()) {
      alert("It is a tie!");
      return;
    }
    let moveAI = generateAImove(gameboard.getCurrentMarks());
    playerAI.saveTile(moveAI);
    gameboard.addMark(playerAI.name, moveAI);
    let [xRangeAI, yRangeAI] = TILES[moveAI];
    let x1AI = xRangeAI[0];
    let x2AI = xRangeAI[1];
    let y1AI = yRangeAI[0];
    let y2AI = yRangeAI[1];
    drawCicle(x1AI, y1AI, x2AI, y2AI);
    winner = checkGame(gameboard);
    if (winner) {
      alert(`Winner: ${winner}!`);
      return;
    }
  })
);

restart.addEventListener("click", (e) => {
  playerHuman.clearTiles();
  playerAI.clearTiles();
  gameboard.clear();
  resetTiles();
});

// show the winner (outlay)
