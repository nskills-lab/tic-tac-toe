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

loadPixels();
