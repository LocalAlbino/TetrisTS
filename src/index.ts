import "./block.ts";
import { BlockType, getBlock, Piece } from "./block.ts";

const rows = 40,
  cols = 10;

// Type assertion here since these elements always should exist
const c = document.getElementById("matrix") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;

let matrix = Array(rows).fill(Array(cols).fill(0));

function randomGenerator() {
  // Fisher-Yates shuffle algorithm will generate a randomly shuffled set of blocks
  const blocks = [1, 2, 3, 4, 5, 6, 7];
  let currentIndex = blocks.length;

  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [blocks[currentIndex], blocks[randomIndex]] = [
      blocks[randomIndex],
      blocks[currentIndex],
    ];
  }

  return blocks;
}

function setColor(block: number, ctx: CanvasRenderingContext2D) {
  if (block === 0) {
    ctx.fillStyle = "block";
  } else if (block === 1) {
    ctx.fillStyle = "cyan";
  } else if (block === 2) {
    ctx.fillStyle = "blue";
  } else if (block === 3) {
    ctx.fillStyle = "orange";
  } else if (block === 4) {
    ctx.fillStyle = "yellow";
  } else if (block === 5) {
    ctx.fillStyle = "lime";
  } else if (block === 6) {
    ctx.fillStyle = "red";
  } else if (block === 7) {
    ctx.fillStyle = "purple";
  } else {
    // Reset to default state if number falls outside of range
    block = 0;
    ctx.fillStyle = "block";
  }
}

function draw() {
  const skyline = 18,
    spacing = 10,
    halfSpacing = 5;
  for (let row = skyline; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (row === skyline) {
        // Row is the half-line between the skyline and bufferzone
        // Therefore the tiles should only be half the height
        setColor(matrix[row][col], ctx);
        ctx.fillRect(col * spacing, 0, spacing, halfSpacing);
      } else {
        // Normal matrix rows, should have full spacing
        setColor(matrix[row][col], ctx);
        ctx.fillRect(
          col * spacing,
          (row - skyline - 1) * spacing + halfSpacing,
          spacing,
          spacing,
        );
      }
    }
  }
  ctx.fill();
}

draw();
