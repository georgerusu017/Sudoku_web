
import { CONTROL_ID } from './constants.js';
import { findLineNeighbors, findColumnNeighbors, populateTable } from './functions.js';
import state from './state.js';

const cellClick = (event) => {
    state.setSelectedCell(event.target.id);
}

export function addCellClickListeners() {
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", cellClick);
    })
}

function incrementInvalid(selectedCell, comparator, index) {
    if (state.cells[index].value == comparator) {
        state.cells[index].invalidCount += 1;
        selectedCell.invalidCount += 1;
    }

}

function incrementGroup(line, column, children, selectedCell, comparator){

    line.forEach(index => {
        incrementInvalid(selectedCell, comparator, index)
    })

    column.forEach(index => {
        incrementInvalid(selectedCell, comparator, index)
    })

    children.forEach(index => {
        incrementInvalid(selectedCell, comparator, index)
    })

}

function decrementInvalid(selectedCell, comparator, index) {
    if (state.cells[index].value == comparator) {
        state.cells[index].invalidCount -= 1;
        selectedCell.invalidCount -= 1;
    }
}

function decrementGroup(line, column, children, selectedCell, comparator){

    line.forEach(index => {
        decrementInvalid(selectedCell, comparator, index)
    })

    column.forEach(index => {
        decrementInvalid(selectedCell, comparator, index)
    })

    children.forEach(index => {
        decrementInvalid(selectedCell, comparator, index)
    })
}

function handleNumberKeyPress(event, selectedCellIndex) {

    const myRegex = /[1-9]/

    const selectedCell = state.cells[selectedCellIndex];
    const lineCellIndexes = findLineNeighbors(selectedCellIndex)
    const columnCellIndexes = findColumnNeighbors(selectedCellIndex);
    const children = state.cells[selectedCellIndex].squareCells;
    let childrenIndexes = children.map((cellHtml) => {
        const cellId = cellHtml.id.split("-").pop();
        return cellId;
    })
    childrenIndexes = childrenIndexes.filter(index => index != selectedCellIndex);

    if (myRegex.test(event.key) && selectedCell.isEditable == true) {
        if (selectedCell.value == "") {

            incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, event.key)
            selectedCell.value = event.key;
        
        }
        else if (selectedCell.value == event.key) {

            decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, event.key)
            selectedCell.value = "";

        }
        else if (selectedCell.value != event.key && selectedCell.value != "") {

            decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)
            selectedCell.value = event.key;
            incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, event.key)

        }
    }
}

function handleArrowKeyPress(event, selectedCellIndex) {
    let pointer = selectedCellIndex;
    const neighbors = findLineNeighbors(pointer);

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

    // map in loc de forEach
    const numberButtons = [];

    CONTROL_ID.numberButtons.forEach((element) => {
        numberButtons.push(document.querySelector(`#${element}`))
    })
    //

    newGameButton.addEventListener('click', () => {
        startGame();
    });

    numberButtons.forEach((element) => {
        element.addEventListener('click', () => {

            const selectedCellIndex = state.getSelectedCellIndex()
            const selectedCell = state.cells[selectedCellIndex];
            const value = numberButtons.indexOf(element) + 1;

            if (selectedCell.isEditable) {

                if (selectedCell.value != value) {
                    selectedCell.value = value;
                }
                else {
                    selectedCell.value = null;
                }

            }
            state.setSelectedCell(`cell-${selectedCellIndex}`);
        });
    })
}

function selectStartingCell() {
    state.setSelectedCell('cell-0')
}

export function startGame() {
    const SUDOKU_UNSOLVED = sudoku.generate("insane");
    const SUDOKU_SOLVED = sudoku.solve(SUDOKU_UNSOLVED);
    populateTable(SUDOKU_UNSOLVED);
    selectStartingCell();
}
