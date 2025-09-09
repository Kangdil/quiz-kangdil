// rpg.js
const canvas = document.getElementById("rpg-canvas");
const ctx = canvas.getContext("2d");

// Make canvas always fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Player
let keys = {};
let player = { x: 200, y: 200, size: 28, speed: 2 };

// Tile map
const tileSize = 32;
const mapWidth = 50;
const mapHeight = 50;
let map = [];

// Generate random map (grass + water)
for (let y = 0; y < mapHeight; y++) {
  let row = [];
  for (let x = 0; x < mapWidth; x++) {
    let val = Math.random() < 0.15 ? "water" : "grass";
    row.push(val);
  }
  map.push(row);
}

// Controls (keyboard)
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// Mobile joystick
let joystick = document.getElementById("joystick");
let stick = document.getElementById("stick");
let dragging = false;

joystick.addEventListener("touchstart", e => {
  dragging = true;
  e.preventDefault();
}, { passive: false });

joystick.addEventListener("touchend", e => {
  dragging = false;
  stick.style.left = "35px";
  stick.style.top = "35px";
  keys = {};
  e.preventDefault();
}, { passive: false });

joystick.addEventListener("touchmove", e => {
  if (!dragging) return;
  e.preventDefault();

  let rect = joystick.getBoundingClientRect();
  let touch = e.touches[0];
  let dx = touch.clientX - (rect.left + rect.width / 2);
  let dy = touch.clientY - (rect.top + rect.height / 2);

  // Limit stick movement
  let dist = Math.min(Math.sqrt(dx*dx + dy*dy), rect.width / 2 - 15);
  let angle = Math.atan2(dy, dx);

  let stickX = rect.width/2 - 15 + dist * Math.cos(angle);
  let stickY = rect.height/2 - 15 + dist * Math.sin(angle);

  stick.style.left = stickX + "px";
  stick.style.top = stickY + "px";

  // Reset keys each frame
  keys = {};
  if (dy < -10) keys["ArrowUp"] = true;
  if (dy > 10) keys["ArrowDown"] = true;
  if (dx < -10) keys["ArrowLeft"] = true;
  if (dx > 10) keys["ArrowRight"] = true;
}, { passive: false });

// Draw map relative to player
function drawMap() {
  let startX = Math.floor(player.x / tileSize) - 12;
  let startY = Math.floor(player.y / tileSize) - 9;

  for (let y = startY; y < startY + 20; y++) {
    for (let x = startX; x < startX + 25; x++) {
      if (y < 0 || x < 0 || y >= mapHeight || x >= mapWidth) continue;
      let tile = map[y][x];
      ctx.fillStyle = (tile === "grass") ? "#4caf50" : "#1e88e5";
      ctx.fillRect(
        (x * tileSize - player.x) + canvas.width / 2,
        (y * tileSize - player.y) + canvas.height / 2,
        tileSize, tileSize
      );
    }
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move player
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  drawMap();

  // Draw player (yellow square)
  ctx.fillStyle = "yellow";
  ctx.fillRect(
    canvas.width / 2 - player.size / 2,
    canvas.height / 2 - player.size / 2,
    player.size,
    player.size
  );

  requestAnimationFrame(gameLoop);
}
gameLoop();
