"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlock = getBlock;
exports.rotateClockwise = rotateClockwise;
exports.generateNextPieces = generateNextPieces;
function getBlock(type) {
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
            const _exhaustiveCheck = type;
    }
}
function rotateClockwise(block, matrix) {
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
            const _exhaustiveCheck = block.type;
    }
}
function randomGenerator() {
    // Fisher-Yates shuffle algorithm will generate a randomly shuffled set of blocks
    const blocks = [
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
function generateNextPieces(matrix) {
    const blocks = randomGenerator();
    let pieces = [];
    for (const block of blocks) {
        // Piece should always be of type Piece, if not, something is wrong
        const piece = getBlock(block);
        pieces.push(piece);
    }
    return pieces;
}
// The matrix is 40 rows in height
// where row 0 is the top row and row 39 is the bottom row
// The skyline is therefore 21 rows above row 39, making it row 18
// This is why pieces are generated at height 18 and above
function getIBlock() {
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
function getJBlock() {
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
function getSBlock() {
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
function getOBlock() {
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
function getZBlock() {
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
function getTBlock() {
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
function getLBlock() {
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
function canRotate(blockPosition, matrix) {
    for (const position of blockPosition) {
        if (matrix[position.x][position.y] !== 0) {
            return false;
        }
    }
    return true;
}
function isLegalSpace(blockPosition) {
    for (const position of blockPosition) {
        if (!(position.x >= 0) ||
            !(position.x < 10) ||
            !(position.y < 40) ||
            !(position.y >= 0)) {
            return false;
        }
    }
    return true;
}
// Rotate blocks clockwise
function rotateIClockwise(block, matrix) {
    if (block.type != "IBlock") {
        return;
    }
    const oldPos = block.blockPosition[0];
    let arrPos = 0;
    if (block.rotationState === "North") {
        for (let i = 1; i >= -2; i--) {
            if (arrPos < block.blockPosition.length) {
                let newPos = block.blockPosition;
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
                let newPos = block.blockPosition;
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
                let newPos = block.blockPosition;
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
                let newPos = block.blockPosition;
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
