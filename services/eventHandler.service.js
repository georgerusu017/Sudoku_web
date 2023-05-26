
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
    state.addToHistory(selectedCell);

    if (!selectedCell.isEditable) { return; }

    if (!state.isNotesEnabled) {

        selectedCell.notesValues.length = 0;

        if (selectedCell.value == "") {

            selectedCell.value = value;
            incrementGroup(selectedCell.id, selectedCell, selectedCell.value)
        }
        else if (selectedCell.value == value) {

            decrementGroup(selectedCell.id, selectedCell, value)
            selectedCell.value = "";
        }

        else if (selectedCell.value != value) {

            decrementGroup(selectedCell.id, selectedCell, selectedCell.value)
            selectedCell.value = value;
            incrementGroup(selectedCell.id, selectedCell, selectedCell.value)
        }
    }

    else {
        if (selectedCell.value != "") {
            decrementGroup(selectedCell.id, selectedCell, selectedCell.value)
            selectedCell.value = "";
        }
        // if (selectedCell.notesValues == ""){
        //     state.addToHistory(selectedCell);
        // }
        selectedCell.updateNotesValues(value)

    }
    state.setSelectedCell(selectedCell);
}

function handleDelete(selectedCellIndex) {

    const selectedCell = state.cells[selectedCellIndex];
    state.addToHistory(selectedCell);

    if (selectedCell.notesValues.length > 0){
        selectedCell.notesValues.length = 0;
        selectedCell.value = ``;
    }

    if (!selectedCell.isEditable || selectedCell.value == "") { return; }

    decrementGroup(selectedCell.id, selectedCell, selectedCell.value)
    selectedCell.value = '';

    state.setSelectedCell(selectedCell);
    console.log("history = ", state.history)
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

    state.setSelectedCell(state.cells[cellToSelectIndex]);
}

function addKeyboardListeners() {
    document.addEventListener("keydown", (event) => {
        const selectedCellIndex = state.getSelectedCellIndex();
        const selectedCell = state.cells[selectedCellIndex];

        if (/^[1-9]$/.test(event.key)) {
            handleValueChange(event.key, selectedCellIndex);
        } else if ([ARROW_KEY.up, ARROW_KEY.down, ARROW_KEY.left, ARROW_KEY.right].includes(event.key)) {
            handleArrowNavigation(event, selectedCellIndex);
        } else if (event.key == "Delete" && selectedCell.isEditable) {
            handleDelete(selectedCellIndex);
        }
    });
}

function addCellClickListeners() {
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", () => {
            state.setSelectedCell(cell);
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

    document.querySelector(`#${CONTROL_ID.undoButton}`).addEventListener('click', undo);

    document.querySelector(`#${CONTROL_ID.eraseButton}`).addEventListener('click', () => {
        const selectedCellIndex = state.getSelectedCellIndex();
        handleDelete(selectedCellIndex);
    });

    document.querySelector(`#${CONTROL_ID.notesButton}`).addEventListener('click', () => {
        if (state.isNotesEnabled) {
            state.isNotesEnabled = false;
        }
        else {
            state.isNotesEnabled = true;
        }
    });
}

function undo (){
    if (state.history.length > 0) {
        const lastValueChange = state.history.pop();
        const selectedCell = state.cells[lastValueChange.id];
        // first we delete what's inside
        console.log("SelectedCell = ", selectedCell)

        if (selectedCell.value) {
            decrementGroup(selectedCell.id, selectedCell, selectedCell.value)
            selectedCell.value = "";
        }

        if (selectedCell.notesValues.length != 0) {
            selectedCell.notesValues.length = 0;
            selectedCell.value = "";
        }

        console.log(state.history)

        //then we add the history values

        if (lastValueChange.notesValues.length != 0) {
            lastValueChange.notesValues.forEach(value => {
                selectedCell.updateNotesValues(value)
            })
        }
        else{
            selectedCell.value = lastValueChange.value;
            if(selectedCell.value){
                incrementGroup(selectedCell.id, selectedCell, selectedCell.value)
            }
        }
        state.setSelectedCell(selectedCell);
    }
}

export function addEventListeners() {
    addButtonsListeners();
    addCellClickListeners();
    addKeyboardListeners();
}