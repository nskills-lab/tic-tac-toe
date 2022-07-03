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
    let currentHumanTiles = playerHuman.getMarkedTiles();
    let currentAITiles = playerAI.getMarkedTiles();

    if (currentHumanTiles.includes(tile) || currentAITiles.includes(tile)) {
      alert("The tile is already marked!");
      return;
    }
    drawX(x1, y1, x2, y2);
    playerHuman.saveTile(tile);
    gameboard.addMark(playerHuman.name, tile);

    let moveAI = generateAImove(gameboard.getCurrentMarks());
    playerAI.saveTile(moveAI);
    gameboard.addMark(playerAI.name, moveAI);
    let [xRangeAI, yRangeAI] = TILES[moveAI];
    let x1AI = xRangeAI[0];
    let x2AI = xRangeAI[1];
    let y1AI = yRangeAI[0];
    let y2AI = yRangeAI[1];
    drawCicle(x1AI, y1AI, x2AI, y2AI);

    console.log(checkTheWinner());
  })
);

restart.addEventListener("click", (e) => {
  playerHuman.clearTiles();
  resetTiles();
  gameboard.clear();
});

function checkTheWinner() {
  let currentGameBoard = gameboard.getCurrentMarks();
  let winner = "";
  let human = "human";
  let ai = "AI";

  // row check

  for (let count = 1; count <= 9; count + 3) {
    winner =
      (currentGameBoard[count] == currentGameBoard[count + 1]) ==
      currentGameBoard[count + 2];
  }

  // column check
  // diagonal check

  return winner;
}

// decide who is the winner or if it is a draw
// show the winner (outlay)
