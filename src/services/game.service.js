import { isInRange, randomEnum } from "./utils.service";

const ROW_SIZE = 5;
const COLUMNS = ROW_SIZE;
const ROWS = ROW_SIZE;

const TURN = 90;

const TURNS = {
    up: 0,
    right: 90,
    down: 180,
    left: 270
};

function createNewCell(rowIdx, cellIdx) {
    const turn = randomEnum(TURNS);
    return {
        row: rowIdx,
        column: cellIdx,
        visualTurn: turn,
        turn,
    }
}

function populateRow(_, rowIdx) {
    return Array(COLUMNS).fill(0).map((_, columnIdx) => {
        return createNewCell(rowIdx, columnIdx);
    });
}

export function populateBoard() {
    return Array(ROWS).fill(0).map(populateRow)
}

const inBoardRange = isInRange.bind(null, 0, ROW_SIZE);

function getValidNeighbor(row, col, board) {
    return (inBoardRange(row) && inBoardRange(col)) ? board[row][col] : null;
}

export function getCellNeighbors(cell, board) {

    const possibleSides = {
        top: getValidNeighbor(cell.row - 1, cell.col, board),
        bottom: getValidNeighbor(cell.row + 1, cell.column, board),
        left: getValidNeighbor(cell.row, cell.column - 1, board),
        right: getValidNeighbor(cell.row, cell.column + 1, board)
    }

    const validNeighbors = {};

    for (let key in possibleSides) {
        if (possibleSides[key]) {
            validNeighbors[key] = possibleSides[key];
        }
    }

    return validNeighbors;
}

export function turnCell(cell) {
    cell.turn += TURN;
    cell.visualTurn += TURN;
    if (cell.turn >= 360) {
        cell.turn = 0;
    }
}

const TURN_TO_SIDES = {
    0: ['left', 'top'],
    90: ['top', 'right'],
    180: ['right', 'bottom'],
    270: ['bottom', 'left']
}
export function getCellSides(cell) {
    return TURN_TO_SIDES[cell.turn];
}

const OPPOSITE_SIDES = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
}
function getOpposite(side) {
    return OPPOSITE_SIDES[side];
}

export function getOppositeSides(cell) {
    const sides = getCellSides(cell);
    const oppositeSides = sides.map(getOpposite);

    return oppositeSides;
}