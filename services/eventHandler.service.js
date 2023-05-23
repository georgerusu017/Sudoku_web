
import { CONTROL_ID, ARROW_KEY } from '../constants.js';
import state from '../state/State.js';
import { Cell } from "../state/Cell.js";

function incrementGroup(selectedCellIndex, selectedCell, value) {
    const indexedToChange = state.cells[selectedCellIndex].cellsNeighbors
        .filter(index => state.cells[index].value === value);
    indexedToChange.forEach(index => state.cells[index].invalidCount++);
    selectedCell.invalidCount += indexedToChange.length;
}

function decrementGroup(selectedCellIndex, selectedCell, value) {
    const indexedToChange = state.cells[selectedCellIndex].cellsNeighbors
        .filter(index => state.cells[index].value === value);
    indexedToChange.forEach(index => state.cells[index].invalidCount--);
    selectedCell.invalidCount -= indexedToChange.length;
}

/**
 * @param {String} value 
 * @param {Number} selectedCellIndex 
 */
function handleValueChange(value, selectedCellIndex) {

    const selectedCell = state.cells[selectedCellIndex];

    if (!selectedCell.isEditable) { return; }

    if (!state.notesButtonSelected) {

        if (selectedCell.notesHtml.length > 0) { selectedCell.deleteNotes() }

        if (selectedCell.value == "") {

            selectedCell.value = value;
            incrementGroup(selectedCellIndex, selectedCell, selectedCell.value)
        }
        else if (selectedCell.value == value) {

            decrementGroup(selectedCellIndex, selectedCell, value)
            selectedCell.value = "";
        }

        else if (selectedCell.value != value) {

            decrementGroup(selectedCellIndex, selectedCell, selectedCell.value)
            selectedCell.value = value;
            incrementGroup(selectedCellIndex, selectedCell, selectedCell.value)
        }
    }

    else {
        if (selectedCell.value != "") {
            decrementGroup(selectedCellIndex, selectedCell, selectedCell.value)
            selectedCell.value = "";
        }

        selectedCell.notesValueUpdate(value)

    }
    state.setSelectedCell(selectedCell.idText);
}

function handleDelete(selectedCellIndex) {
    const selectedCell = state.cells[selectedCellIndex];

    if (selectedCell.notesHtml.length > 0) {
        selectedCell.deleteNotes();
        selectedCell.value = null;
    }

    if (!selectedCell.isEditable || selectedCell.value == "") { return; }

    decrementGroup(selectedCellIndex, selectedCell, selectedCell.value)
    selectedCell.value = '';

    state.setSelectedCell(selectedCell.idText);
}

function handleArrowNavigation(event, selectedCellIndex) {
    let cellToSelectIndex = selectedCellIndex;

    const neighbors = Cell.findLineNeighbors(cellToSelectIndex);

    if (event.key === ARROW_KEY.left) {
        if (cellToSelectIndex - 1 < neighbors[0]) {
            cellToSelectIndex += 8
        }
        else {
            cellToSelectIndex--;
        }
    } else if (event.key === ARROW_KEY.right) {
        if (cellToSelectIndex + 1 > neighbors.pop()) {
            cellToSelectIndex -= 8
        }
        else {
            cellToSelectIndex++;
        }
    } else if (event.key === ARROW_KEY.up) {

        cellToSelectIndex -= 9;
        if (cellToSelectIndex < 0) {
            cellToSelectIndex += 81;
        }
    } else if (event.key === ARROW_KEY.down) {

        cellToSelectIndex += 9;
        if (cellToSelectIndex > 80) {
            cellToSelectIndex -= 81;
        }
    }

    state.setSelectedCell(state.cells[cellToSelectIndex].idText);
}

function addKeyboardListeners() {
    document.addEventListener("keydown", (event) => {
        const selectedCellIndex = state.getSelectedCellIndex();
        const selectedCell = state.cells[selectedCellIndex];

        if (/^[1-9]$/.test(event.key)) {
            handleValueChange(event.key, selectedCellIndex);
        } else if ([ARROW_KEY.up, ARROW_KEY.down, ARROW_KEY.left, ARROW_KEY.right].includes(event.key)) {
            handleArrowNavigation(event, selectedCellIndex);
        } else if (event.key == "Delete" && selectedCell.isEditable && selectedCell.value != "") {
            handleDelete(selectedCellIndex);
        }
    });
}

function addCellClickListeners() {
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", (event) => {
            state.setSelectedCell(event.target.id);
        });
    })
}

function addButtonsListeners() {
    CONTROL_ID.numberButtons.forEach((numberButtonId, index) => {
        document.querySelector(`#${numberButtonId}`).addEventListener('click', () => {
            const value = String(index + 1);
            const selectedCellIndex = parseInt(state.getSelectedCellIndex());

            handleValueChange(value, selectedCellIndex)
        });
    })

    document.querySelector(`#${CONTROL_ID.newGameButton}`).addEventListener('click', () => {
        state.startNewGame();
    });

    document.querySelector(`#${CONTROL_ID.eraseButton}`).addEventListener('click', () => {
        const selectedCellIndex = state.getSelectedCellIndex();
        handleDelete(selectedCellIndex);
    });

    document.querySelector(`#${CONTROL_ID.notesButton}`).addEventListener('click', () => {
        if (state.notesButtonSelected) {
            state.notesButtonSelected = false;
        }
        else {
            state.notesButtonSelected = true;
        }
    });
}

export function addEventListeners() {
    addButtonsListeners();
    addCellClickListeners();
    addKeyboardListeners();
}