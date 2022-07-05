import {
  RANGES,
  TILES,
  playerFactory,
  gameboard,
  loadPixels,
  drawCicle,
  drawX,
  generateAImove,
  isBarCell,
  getRange,
  checkGame,
  restartGame,
  displayResult,
} from "./ticTacToe.js";
const canvas = document.querySelector(".canvas");
const overlay = document.querySelector("#result");
const resultEl = document.querySelector("div[data-result]");

loadPixels(canvas);
const playerHuman = playerFactory("Human");
const playerAI = playerFactory("AI");

document.addEventListener("click", (e) => {
  if (e.target.matches("button[data-button-restart]")) {
    restartGame(playerHuman, playerAI, gameboard);
  }
  if (e.target.matches("button[data-button-close]")) {
    overlay.classList.remove("open");
    restartGame(playerHuman, playerAI, gameboard);
  }
  if (e.target.matches("div[data-x-coordinate]")) {
    let cell = e.target;
    if (gameboard.hasNoSpace()) {
      displayResult(0, resultEl, overlay);
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

    if (winner) {
      displayResult(winner, resultEl, overlay);
      return;
    }

    if (gameboard.hasNoSpace()) {
      displayResult(0, resultEl, overlay);
      return;
    }

    let moveAI = generateAImove(gameboard.getCurrentMarks());
    playerAI.saveTile(moveAI);
    gameboard.addMark(playerAI.name, moveAI);
    let [xRangeAI, yRangeAI] = TILES[moveAI];
    let x1AI = xRangeAI[0];
    let y1AI = yRangeAI[0];
    let y2AI = yRangeAI[1];
    drawCicle(x1AI, y1AI, y2AI);
    winner = checkGame(gameboard);
    if (winner) {
      displayResult(winner, resultEl, overlay);
      return;
    }
  }
});
