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
  stick.style.left = "35px"; // reset to center
  stick.style.top = "35px";
  keys = {}; // clear keys
  e.preventDefault();
}, { passive: false });

joystick.addEventListener("touchmove", e => {
  if (!dragging) return;
  e.preventDefault();

  let rect = joystick.getBoundingClientRect();
  let touch = e.touches[0];

  // Relative to center
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
