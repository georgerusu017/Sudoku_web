
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


function incrementGroup(line, column, square, selectedCell, value) {

    const indexes = new Set([...line, ...column, ...square]);
    const indexedToChange = [...indexes].filter(index => state.cells[index].value === value);

    indexedToChange.forEach(index => state.cells[index].invalidCount++);
    selectedCell.invalidCount += indexedToChange.length;

}

function decrementGroup(line, column, square, selectedCell, value) {

    const indexes = new Set([...line, ...column, ...square]);
    const indexedToChange = [...indexes].filter(index => state.cells[index].value === value);

    indexedToChange.forEach(index => state.cells[index].invalidCount--);
    selectedCell.invalidCount -= indexedToChange.length;

}

function handleNumberKeyPress(event, selectedCellIndex) {

    const myRegex = /^[1-9]$/
    // se repeta si este deja in state in highlight
    const selectedCell = state.cells[selectedCellIndex];

    const lineCellIndexes = findLineNeighbors(selectedCellIndex)
    const columnCellIndexes = findColumnNeighbors(selectedCellIndex);
    const children = state.cells[selectedCellIndex].squareCells;
    let childrenIndexes = children.map((cellHtml) => {
        const cellId = cellHtml.id.split("-").pop();
        return cellId;
    })
    childrenIndexes = childrenIndexes.filter(index => index != selectedCellIndex);
    //

    if (myRegex.test(event.key) && selectedCell.isEditable == true) {

        // console.log("selectedCell.invalidCount inainte = ",selectedCell.invalidCount)

        if (selectedCell.value == "") {

            selectedCell.value = event.key;
            incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)

        }
        else if (selectedCell.value == event.key) {

            decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, event.key)
            selectedCell.value = "";

        }
        else if (selectedCell.value != event.key) {

            decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)
            selectedCell.value = event.key;
            incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)

        }

        // console.log("selectedCell.invalidCount dupa = ",selectedCell.invalidCount)

    }

    if (event.key == "Delete" && selectedCell.isEditable && selectedCell.value != "") {
        decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)
        selectedCell.value = '';
    }

    state.setSelectedCell(`cell-${selectedCellIndex}`);

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
    const eraseButton = document.querySelector(`#${CONTROL_ID.eraseButton}`)

    // map in loc de forEach
    const numberButtons = [];

    CONTROL_ID.numberButtons.forEach((element) => {
        numberButtons.push(document.querySelector(`#${element}`))
    })
    //

    newGameButton.addEventListener('click', () => {
        startGame();
    });

    eraseButton.addEventListener('click', () => {
        const selectedCellIndex = state.getSelectedCellIndex()
        const selectedCell = state.cells[selectedCellIndex];
        const value = state.cells[selectedCellIndex].value;

        const lineCellIndexes = findLineNeighbors(selectedCellIndex)
        const columnCellIndexes = findColumnNeighbors(selectedCellIndex);
        const children = state.cells[selectedCellIndex].squareCells;
        let childrenIndexes = children.map((cellHtml) => {
            const cellId = cellHtml.id.split("-").pop();
            return cellId;
        })

        if (selectedCell.isEditable && selectedCell.value != "") {

            decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)
            selectedCell.value = '';

        }
        state.setSelectedCell(`cell-${selectedCellIndex}`);
    });

    numberButtons.forEach((element) => {
        element.addEventListener('click', () => {

            const selectedCellIndex = state.getSelectedCellIndex()
            const selectedCell = state.cells[selectedCellIndex];
            const value = parseInt(numberButtons.indexOf(element) + 1);

            // se repeta, de facut prin STATE
            const lineCellIndexes = findLineNeighbors(selectedCellIndex)
            const columnCellIndexes = findColumnNeighbors(selectedCellIndex);
            const children = state.cells[selectedCellIndex].squareCells;
            let childrenIndexes = children.map((cellHtml) => {
                const cellId = cellHtml.id.split("-").pop();
                return cellId;
            })

            if (selectedCell.isEditable) {

                // console.log("selectedCell inainte = ",selectedCell)

                if (selectedCell.value == "") {

                    selectedCell.value = value;
                    incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)

                }
                else if (selectedCell.value == value) {

                    decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, value)
                    selectedCell.value = "";
                }
                else if (selectedCell.value != value) {

                    decrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)
                    selectedCell.value = value;
                    incrementGroup(lineCellIndexes, columnCellIndexes, childrenIndexes, selectedCell, selectedCell.value)

                }

                // console.log("selectedCell dupa = ",selectedCell)

            }
            // 
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
