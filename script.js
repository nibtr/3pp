import { vertices, edges } from "./cube.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const BACKGROUND = "#000000";
const FOREGROUND = "#17ebd9";

/** Field of view, in degree */
const FOV = (66 * Math.PI) / 180;
const FOCAL_LENGTH = 1 / Math.tan(FOV / 2);

const SCROLL_SENSITIVITY = 0.001;
const MIN_DZ = 0.5;
const MAX_DZ = 8;
const ZOOM_SPEED = 5;

let lastTime = 0;
let angle = 0;
let cameraDz = 2;
let dzTarget = cameraDz;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

addEventListener("wheel", (event) => {
  dzTarget += event.deltaY * SCROLL_SENSITIVITY;
  dzTarget = Math.min(MAX_DZ, Math.max(MIN_DZ, dzTarget));
});

/** Clear the screen */
function clear() {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/** Draws the point onto screen */
// function point({ x, y }) {
//   const size = 10;
//   ctx.fillStyle = FOREGROUND;
//   ctx.fillRect(x - size / 2, y - size / 2, size, size);
// }

/**
 * Maps the coord of p from normalized Cartesian system to screen coordination system
 * (-1..1 => screen)
 */
function toScreen(p) {
  // -1..1 => 0..2 => 0..1 => 0..width (or height)
  return {
    x: ((p.x + 1) / 2) * canvas.width,
    y: (1 - (p.y + 1) / 2) * canvas.height,
  };
}

/** Projects the 3d coordinate to a 2d coordinate */
function project({ x, y, z }) {
  const aspect = canvas.width / canvas.height;

  if (z <= 0.001) return null; // near camera
  return {
    x: ((x / z) * FOCAL_LENGTH) / aspect,
    y: (y / z) * FOCAL_LENGTH,
  };
}

/** Translate the z coordinate */
function translateZ({ x, y, z }, dz) {
  return {
    x,
    y,
    z: z + dz,
  };
}

/** Rotate a point in xz plane */
function rotateXZ({ x, y, z }, theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return {
    x: x * c - z * s,
    z: x * s + z * c,
    y,
  };
}

/** Transform a 3d vertex to a 2d screen projected point */
function transformVertex(v) {
  const view = rotateXZ(v, angle);
  const camera = translateZ(view, cameraDz);
  const projected = project(camera);
  return projected ? toScreen(projected) : null;
}

/** Draw a line from p1 to p2 */
function line(p1, p2) {
  ctx.strokeStyle = FOREGROUND;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function frame(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;

  angle += Math.PI * 0.25 * dt;
  angle %= 2 * Math.PI; // clamp in range 0..2pi
  cameraDz += (dzTarget - cameraDz) * ZOOM_SPEED * dt;

  clear();

  const tvs = vertices.map(transformVertex);

  for (const e of edges) {
    for (let i = 0; i < e.length; i++) {
      const a = tvs[e[i]];
      const b = tvs[e[(i + 1) % e.length]];
      if (a && b) line(a, b);
    }
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
