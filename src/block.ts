interface Position {
  x: number;
  y: number;
}

interface Piece {
  blockPosition: Position[];
  type: BlockType;
  held: boolean;
}

type BlockType =
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

function getIBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "IBlock",
    held: false,
  };
}

function getJBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "JBlock",
    held: false,
  };
}

function getSBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "SBlock",
    held: false,
  };
}

function getOBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "OBlock",
    held: false,
  };
}

function getZBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "ZBlock",
    held: false,
  };
}

function getTBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "TBlock",
    held: false,
  };
}

function getLBlock(): Piece {
  return {
    blockPosition: [{ x: 0, y: 0 }],
    type: "LBlock",
    held: false,
  };
}
