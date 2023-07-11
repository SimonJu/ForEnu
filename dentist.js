// Game Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FOOD_SIZE = 20;

// Game Variables
let canvas;
let ctx;
let foodX;
let foodY;
let cavities;

// Game Initialization
function init() {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  cavities = 0;

  spawnFood();

  document.addEventListener('keydown', handleKeyDown);

  setInterval(update, 10);
}

// Update the game state
function update() {
  clearCanvas();
  drawFood();
  drawCavities();
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = 'green';
  ctx.fillRect(foodX, foodY, FOOD_SIZE, FOOD_SIZE);
}

// Draw the cavities count on the canvas
function drawCavities() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText(`Cavities: ${cavities}`, 10, 30);
}

// Handle keydown event for food consumption
function handleKeyDown(event) {
  const KEY_SPACE = 32;

  if (event.keyCode === KEY_SPACE) {
    if (isFoodConsumed()) {
      cavities++;
      spawnFood();
    }
  }
}

// Check if the food is consumed by the player
function isFoodConsumed() {
  const toothX = CANVAS_WIDTH / 2;
  const toothY = CANVAS_HEIGHT / 2;
  const foodRight = foodX + FOOD_SIZE;
  const foodBottom = foodY + FOOD_SIZE;

  return toothX < foodRight && toothX > foodX && toothY < foodBottom && toothY > foodY;
}

// Spawn a new food at a random location on the canvas
function spawnFood() {
  const minX = FOOD_SIZE;
  const minY = FOOD_SIZE;
  const maxX = CANVAS_WIDTH - FOOD_SIZE * 2;
  const maxY = CANVAS_HEIGHT - FOOD_SIZE * 2;

  foodX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  foodY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
}

// Start the game
init();
