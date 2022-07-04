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
} from "./ticTacToe.js";
const canvas = document.querySelector(".canvas");
const overlay = document.querySelector("#result");
const resultEl = document.querySelector("div[data-result]");

loadPixels(canvas);
const playerHuman = playerFactory("Human");
const playerAI = playerFactory("AI");
const cells = document.querySelectorAll(".canvas > div");

cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    if (gameboard.hasNoSpace()) {
      displayResult(0);
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
      displayResult(winner);
      return;
    }

    if (gameboard.hasNoSpace()) {
      displayResult(0);
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
      displayResult(winner);
      return;
    }
  })
);

document.addEventListener("click", (e) => {
  if (e.target.matches("button[data-button-restart]")) {
    restartGame(playerHuman, playerAI, gameboard);
  }
  if (e.target.matches("button[data-button-close]")) {
    overlay.classList.remove("open");
    restartGame(playerHuman, playerAI, gameboard);
  }
});

function displayResult(result) {
  overlay.classList.toggle("open");
  if (result == 0) {
    resultEl.textContent = "It is a tie!";
  } else {
    resultEl.textContent = `${result} won!`;
  }
}
