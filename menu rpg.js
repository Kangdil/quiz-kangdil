// rpg.js
const canvas = document.getElementById("rpg-canvas");
const ctx = canvas.getContext("2d");

// Fullscreen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Player
let keys = {};
let player = { x: 200, y: 200, size: 30, speed: 3 };

// Controls
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Game loop
function gameLoop() {
  // Background (green grass)
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move player
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  // Draw player
  ctx.fillStyle = "yellow";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  requestAnimationFrame(gameLoop);
}
gameLoop();
