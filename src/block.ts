interface Piece {
  blockPosition: number[];
  blockType: BlockType;
  blockRotationState: RotationState;
}

type BlockType =
  | "IBlock"
  | "LBlock"
  | "JBlock"
  | "OBlock"
  | "SBlock"
  | "ZBlock"
  | "TBlock";

type RotationState = "North" | "South" | "East" | "West";
