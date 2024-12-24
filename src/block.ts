interface Position {
  x: number;
  y: number;
}

export interface Piece {
  blockPosition: Position[];
  rotationState: RotationState;
  type: BlockType;
  held: boolean;
}

type RotationState = "North" | "South" | "East" | "West";

export type BlockType =
  | "IBlock"
  | "JBlock"
  | "LBlock"
  | "OBlock"
  | "SBlock"
  | "ZBlock"
  | "TBlock";

export function getBlock(type: BlockType) {
  switch (type) {
    case "IBlock":
      return getIBlock();
    case "JBlock":
      return getJBlock();
    case "LBlock":
      return getLBlock();
    case "OBlock":
      return getOBlock();
    case "SBlock":
      return getSBlock();
    case "ZBlock":
      return getZBlock();
    case "TBlock":
      return getTBlock();
    default:
      const _exhaustiveCheck: never = type;
  }
}

export function rotateClockwise(block: Piece, matrix: number[][]) {
  switch (block.type) {
    case "IBlock":
      return rotateIClockwise(block, matrix);
    case "LBlock":
      return rotateLClockwise(block, matrix);
    case "JBlock":
      return rotateJClockwise(block, matrix);
    case "OBlock":
      return rotateOClockwise();
    case "SBlock":
      return rotateSClockwise(block, matrix);
    case "ZBlock":
      return rotateZClockwise(block, matrix);
    case "TBlock":
      return rotateTClockwise(block, matrix);
    default:
      const _exhaustiveCheck: never = block.type;
  }
}

function randomGenerator(): BlockType[] {
  // Fisher-Yates shuffle algorithm will generate a randomly shuffled set of blocks
  const blocks: BlockType[] = [
    "IBlock",
    "LBlock",
    "JBlock",
    "OBlock",
    "SBlock",
    "ZBlock",
    "TBlock",
  ];
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

export function generateNextPieces(matrix: number[][]): Piece[] {
  const blocks: BlockType[] = randomGenerator();
  let pieces: Piece[] = [];

  for (const block of blocks) {
    // Piece should always be of type Piece, if not, something is wrong
    const piece = getBlock(block) as Piece;
    pieces.push(piece);
  }

  return pieces;
}

// The matrix is 40 rows in height
// where row 0 is the top row and row 39 is the bottom row
// The skyline is therefore 21 rows above row 39, making it row 18
// This is why pieces are generated at height 18 and above

function getIBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 18 },
      { x: 4, y: 18 },
      { x: 5, y: 18 },
      { x: 6, y: 18 },
    ],
    rotationState: "North",
    type: "IBlock",
    held: false,
  };
}

function getJBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 17 },
      { x: 4, y: 18 },
      { x: 5, y: 18 },
      { x: 5, y: 18 },
    ],
    rotationState: "North",
    type: "JBlock",
    held: false,
  };
}

function getSBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 18 },
      { x: 4, y: 18 },
      { x: 4, y: 17 },
      { x: 5, y: 17 },
    ],
    rotationState: "North",
    type: "SBlock",
    held: false,
  };
}

function getOBlock(): Piece {
  return {
    blockPosition: [
      { x: 4, y: 18 },
      { x: 4, y: 17 },
      { x: 5, y: 18 },
      { x: 5, y: 17 },
    ],
    rotationState: "North",
    type: "OBlock",
    held: false,
  };
}

function getZBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 17 },
      { x: 4, y: 17 },
      { x: 4, y: 18 },
      { x: 5, y: 18 },
    ],
    rotationState: "North",
    type: "ZBlock",
    held: false,
  };
}

function getTBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 18 },
      { x: 4, y: 18 },
      { x: 4, y: 17 },
      { x: 5, y: 18 },
    ],
    rotationState: "North",
    type: "TBlock",
    held: false,
  };
}

function getLBlock(): Piece {
  return {
    blockPosition: [
      { x: 3, y: 18 },
      { x: 4, y: 18 },
      { x: 5, y: 18 },
      { x: 5, y: 17 },
    ],
    rotationState: "North",
    type: "LBlock",
    held: false,
  };
}

// Blocks can only rotate if they are unobstructed
// Blocks should only move to a new position
// if that position is within the bounds of the matrix

function canRotate(blockPosition: Position[], matrix: number[][]) {
  for (const position of blockPosition) {
    if (matrix[position.x][position.y] !== 0) {
      return false;
    }
  }
  return true;
}

function isLegalSpace(blockPosition: Position[]) {
  for (const position of blockPosition) {
    if (
      !(position.x >= 0) ||
      !(position.x < 10) ||
      !(position.y < 40) ||
      !(position.y >= 0)
    ) {
      return false;
    }
  }
  return true;
}

// Rotate blocks clockwise
// Refer to the Tetris Guideline for a chart defining rotations
// Super rotation system not implemented now but may be later

function rotateIClockwise(block: Piece, matrix: number[][]) {
  if (block.type != "IBlock") {
    return;
  }
  const oldPos: Position = block.blockPosition[0];
  let arrPos = 0;
  if (block.rotationState === "North") {
    for (let i = 1; i >= -2; i--) {
      if (arrPos < block.blockPosition.length) {
        let newPos: Position[] = block.blockPosition;

        newPos[arrPos] = {
          x: oldPos.y + i,
          y: oldPos.x + 2,
        };

        if (canRotate(newPos, matrix) && isLegalSpace(newPos)) {
          block.blockPosition = newPos;
          block.rotationState = "East";
        }
      }
      arrPos++;
    }
  }
  if (block.rotationState === "East") {
    for (let i = -2; i <= 1; i--) {
      if (arrPos < block.blockPosition.length) {
        let newPos: Position[] = block.blockPosition;

        newPos[arrPos] = {
          x: oldPos.y + i,
          y: oldPos.y - 2,
        };

        if (canRotate(newPos, matrix)) {
          block.blockPosition = newPos;
          block.rotationState = "South";
        }
      }
      arrPos++;
    }
  }
  if (block.rotationState === "South") {
    for (let i = -2; i >= 1; i--) {
      if (arrPos < block.blockPosition.length) {
        let newPos: Position[] = block.blockPosition;

        newPos[arrPos] = {
          x: oldPos.y - 2,
          y: oldPos.y + i,
        };

        if (canRotate(newPos, matrix)) {
          block.blockPosition = newPos;
          block.rotationState = "West";
        }
      }
      arrPos++;
    }
  }
  if (block.rotationState === "West") {
    for (let i = -1; i <= 2; i--) {
      if (arrPos < block.blockPosition.length) {
        let newPos: Position[] = block.blockPosition;

        newPos[arrPos] = {
          x: oldPos.y + i,
          y: oldPos.y - 2,
        };

        if (canRotate(newPos, matrix)) {
          block.blockPosition = newPos;
          block.rotationState = "North";
        }
      }
      arrPos++;
    }
  }
}

function rotateOClockwise() {
  return; // The O piece cannot rotate
}
