import { getCellNeighbors, getCellSides, getOppositeSides, populateBoard, turnCell } from '../services/game.service';
import createDataContext from './createDataContext';

const initialGameState = {
    board: [],
    cellsToTurn: [],
    isRunning: false,
    totalTurns: 0,
    userInitiated: false,
    score: 0,
    phase: 0
};


function init() {
    const board = populateBoard();

    const newGameState = Object.assign({}, initialGameState, {
        board
    });

    return newGameState;
}

function initiateChain(state, cell) {
    return {
        ...state,
        userInitiated: true,
        isRunning: true,
        cellsToTurn: [...state.cellsToTurn, cell]
    };
}

function stopChain(state) {
    return {
        ...state,
        isRunning: false
    }
}

function onlyTouchingNeighbors(cellSides, neighbor, position) {
    return cellSides.includes(position);
}

function rotateCells(state) {

    const { cellsToTurn, board } = state;
    let nextCellsToTurn = [];
    const newBoard = JSON.parse(JSON.stringify(board));

    cellsToTurn.forEach((cell, idx, allCellsToTurn) => {
        const turnedCell = newBoard[cell.row][cell.column]
        turnCell(turnedCell);
        const cellSides = getCellSides(turnedCell);

        const allNeighbors = Object.entries(getCellNeighbors(cell, board));

        const sideNeighbors = allNeighbors.filter(([position, neighbor]) => {
            return onlyTouchingNeighbors(cellSides, neighbor, position);
        });

        const touchingNeighbors = sideNeighbors.filter(([position, neighbor]) => {
            const neighborSides = getOppositeSides(neighbor);
            return neighborSides.includes(position);
        });

        const relevantNeighbors = touchingNeighbors.map(([_, neighbor]) => neighbor);

        nextCellsToTurn = nextCellsToTurn.concat(relevantNeighbors);

    });

    return {
        ...state,
        userInitiated: false,
        cellsToTurn: nextCellsToTurn,
        board: newBoard,
        phase: state.phase + 1
    }
}

const gameActions = {
    init,
    initiateChain,
    rotateCells,
    stopChain
};

const { Provider, Context } = createDataContext('game', gameActions, initialGameState);

const GameProvider = Provider;

export const GameContext = Context;
export default GameProvider;