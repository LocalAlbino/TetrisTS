const cells = 400;

// Type assertion here since these elements always should exist
const c = document.getElementById("matrix") as HTMLCanvasElement;
const ctx = c.getContext("2d") as CanvasRenderingContext2D;

let matrix = Array(cells).fill(0);

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
    ctx.fillStyle = "black";
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
    ctx.fillStyle = "black";
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  const spacing = 10,
    halfSpacing = 5,
    skyline = 190;

  for (let cell = skyline; cell < cells; cell++) {
    const row = calculateRow(cell),
      column = calculateColumn(cell);

    // row * spacing returns a value between [0, 390] to get the exact cell
    setColor(matrix[cell], ctx);
    if (cell < skyline + spacing) {
      ctx.fillRect(
        column * spacing,
        row * spacing - skyline,
        spacing,
        halfSpacing,
      );
    } else {
      ctx.fillRect(
        column * spacing,
        row * spacing - skyline - halfSpacing,
        spacing,
        spacing,
      );
    }
  }
  ctx.fill();
}

function calculateRow(cell: number) {
  // Splits the cell into an array of digits
  // The first one or two digits can be used to calculate the row
  // The range of cells is [0, 399]
  let digits = cell.toString().split("").map(Number);
  if (digits.length > 2) {
    return digits[0] * 10 + digits[1]; // The first digit is the tens and the second is the ones
  } else if (digits.length > 1) {
    return digits[0]; // The first digit is the row
  } else {
    return 0; // If there is no first digit, this zero is implied
  }
}

function calculateColumn(cell: number) {
  // Splits the cell into an array of digits
  // The last digit can be used to calculate the column
  // The range of cells is [0, 399]
  let digits = cell.toString().split("").map(Number);

  return digits[digits.length - 1];
}

draw(ctx);
