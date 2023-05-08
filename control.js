
import { CONTROL_ID } from './constants.js';
import { findLineNeighbors, populateTable } from './functions.js';
import state from './state.js';

const cellClick = (event) => {
    state.setSelectedCell(event.target.id);
}

export function addCellClickListeners() {
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", cellClick);
    })
}

function handleNumberKeyPress(event, selectedCellIndex) {

    const myRegex = /[1-9]/
    const selectedCell = state.cells[selectedCellIndex];

    if (myRegex.test(event.key) && selectedCell.isEditable == true) {
        if (selectedCell.value != event.key) {
            selectedCell.value = event.key;
        } else {
            selectedCell.value = null;
        }
    }
}

function handleArrowKeyPress(event, selectedCellIndex) {
    let pointer = selectedCellIndex;
    const neighbors = findLineNeighbors(pointer);
    // don t repeat yourself
    if (event.key === "ArrowLeft") {
        if (pointer - 1 < neighbors[0]) {
            pointer += 8
        }
        else {
            pointer--;
        }
    }

    else if (event.key === "ArrowRight") {

        if (pointer + 1 > neighbors.pop()) {
            pointer -= 8
        }
        else {
            pointer++;
        }
    }

    else if (event.key === "ArrowUp") {

        pointer -= 9;
        if (pointer < 0) {
            pointer += 81;
        }

    }

    else if (event.key === "ArrowDown") {
        pointer += 9;
        if (pointer > 80) {
            pointer -= 81;
        }
    }
    state.setSelectedCell(`cell-${pointer}`);
}

export function addKeyboardListeners() {
    document.addEventListener("keydown", (event) => {
        const selectedCellIndex = state.getSelectedCellIndex()
        handleNumberKeyPress(event, selectedCellIndex);
        handleArrowKeyPress(event, selectedCellIndex);
    });
}

export function addButtonsListeners() {
    const newGameButton = document.querySelector(`#${CONTROL_ID.newGameButton}`)
    const numberButtons = [];

    CONTROL_ID.numberButtons.forEach((element) => {
        numberButtons.push(document.querySelector(`#${element}`))
    })

    newGameButton.addEventListener('click', () => {
        startGame();
    });

    numberButtons.forEach((element) => {
        element.addEventListener('click', () => {
            const selectedCellIndex = state.getSelectedCellIndex()
            const selectedCell = state.cells[selectedCellIndex];
            const value = numberButtons.indexOf(element) + 1;
            if (selectedCell.isEditable == true) {
                if (selectedCell.value != value) {
                    selectedCell.value = numberButtons.indexOf(element) + 1;
                }
                else {
                    selectedCell.value = null;
                }
            }
        });
    })
}

export function selectStartingCell() {
    state.setSelectedCell('cell-0')
}

export function startGame() {
    // is editable ramane blocat
    const SUDOKU_UNSOLVED = sudoku.generate("medium");
    const SUDOKU_SOLVED = sudoku.solve(SUDOKU_UNSOLVED);
    populateTable(SUDOKU_UNSOLVED);
    selectStartingCell();
}