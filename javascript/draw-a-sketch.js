/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

// select elements on page, canvas, shake button

const canvas = document.querySelector("#etch-a-sketch");
const context = canvas.getContext("2d");
const shakeBtn = document.querySelector(".shake");
const MOVE_AMOUNT = 20;

let hue = 0;
// setup our canvas for drawing
const width = canvas.width;
const height = canvas.height;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 15;

context.beginPath();
context.moveTo(x, y);
context.lineTo(x, y);
context.stroke();

// write a draw function
function draw(options) {
  hue += 10;
  context.strokeStyle = `hsl(${hue},100%,50%)`;
  context.beginPath();
  context.moveTo(x, y);

  switch (options.key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  context.lineTo(x, y);
  context.stroke();
}

// write handler for the keys
function handleKey(event) {
  if (event.key.includes("Arrow")) {
    draw({ key: event.key });
    event.preventDefault();
  }
}

// clear/shake function
function clearCanvas() {
  canvas.classList.add("shake");
  context.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    () => {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener("keydown", handleKey);
shakeBtn.addEventListener("click", clearCanvas);
