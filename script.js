const width = screen.width;
const height = screen.height;
const canvas = document.querySelector(".canvas");
const pixelId = "pixel";

function loadPixels() {
  let pixelAmount = 50 * 50;
  for (let yCor = 1; yCor <= 50; yCor++) {
    for (let xCor = 1; xCor <= 50; xCor++) {
      let temp = document.createElement("div");
      temp.setAttribute("data-x-coordinate", xCor);
      temp.setAttribute("data-y-coordinate", yCor);
      canvas.appendChild(temp);
    }
  }
}

function colorX(x1, y1, x2, y2) {
  let xStart = x1 + 3;
  let yStart = y1 + 3;
  let xEnd = x2 - 3;
  let yEnd = y2 - 3;

  for (let yCor = yStart, xCor = xStart; yCor <= yEnd; yCor++, xCor++) {
    colorOneXGrid(xCor, yCor, "red");
  }

  for (let yCor = yStart, xCor = xEnd; yCor <= yEnd; yCor++, xCor--) {
    colorOneXGrid(xCor, yCor, "red");
  }
}

function colorOneXGrid(xCor, yCor, color) {
  let pixel = document.querySelector(
    `div[data-x-coordinate="${xCor}"][data-y-coordinate="${yCor}"]`
  );
  pixel.setAttribute("style", `background-color:${color}`);
}

loadPixels();
colorX(1, 1, 17, 17);
colorX(17, 17, 33, 33);

// Draw a pixaletated circle
// Listen to the click and based on the player decide whether to draw x or circle
// mark the cell whether it is x or circle
// Keep track of player moves
// generate AI's move
// decide who is the winner or if it is a draw
// show the winner (outlay)
// button restarts the game
