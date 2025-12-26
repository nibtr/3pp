export const vertices = [];
export const edges = [];

const grid = 30;
const scale = 0.75; // size in X/Z
const waveHeight = 0.1;
const waveLength = 2 * Math.PI;
const waveSpeed = 2; // radians per second

const xPos = [];
const zPos = [];
for (let i = 0; i < grid; i++) {
  xPos.push((i / (grid - 1) - 0.5) * 2 * scale);
  zPos.push((i / (grid - 1) - 0.5) * 2 * scale);
}

for (let i = 0; i < grid; i++) {
  const x = (i / (grid - 1) - 0.5) * 2 * scale; // [-scale..scale]
  for (let j = 0; j < grid; j++) {
    const z = (j / (grid - 1) - 0.5) * 2 * scale; // [-scale..scale]
    const y = waveHeight * Math.sin(waveLength * (x + z));
    vertices.push({ x, y, z });
  }
}

for (let i = 0; i < grid; i++) {
  for (let j = 0; j < grid; j++) {
    const idx = i * grid + j;
    if (i < grid - 1) edges.push([idx, (i + 1) * grid + j]); // X direction
    if (j < grid - 1) edges.push([idx, i * grid + (j + 1)]); // Z direction
  }
}

export function updateVertices(time) {
  for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
      const idx = i * grid + j;
      vertices[idx].y =
        waveHeight *
        Math.sin(waveLength * (xPos[i] + zPos[j]) + waveSpeed * time);
    }
  }
}
