"use strict";
const rows = 40, cols = 10;
// Type assertion here since ts lsp doesn't correctly read these lines
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
let matrix = Array(rows).fill(Array(cols).fill(0));
function setColor(block, ctx) {
    if (block === 0) {
        ctx.fillStyle = "block";
    }
    else if (block === 1) {
        ctx.fillStyle = "cyan";
    }
    else if (block === 2) {
        ctx.fillStyle = "blue";
    }
    else if (block === 3) {
        ctx.fillStyle = "orange";
    }
    else if (block === 4) {
        ctx.fillStyle = "yellow";
    }
    else if (block === 5) {
        ctx.fillStyle = "lime";
    }
    else if (block === 6) {
        ctx.fillStyle = "red";
    }
    else if (block === 7) {
        ctx.fillStyle = "purple";
    }
    else {
        block = 0;
        ctx.fillStyle = "block";
    }
}
function draw() {
    const offset = 21, spacing = 20;
    for (let row = offset; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            setColor(matrix[row][col], ctx);
            ctx.fillRect(col * spacing, (row - offset) * spacing, spacing, spacing);
        }
    }
    ctx.fill();
}
draw();
