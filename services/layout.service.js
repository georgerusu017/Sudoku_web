import { LAYOUT_ID, CELL_CSS, CONTROL_ID } from "../constants.js";
import { addDiv, addButton, createButtonWithLabelAndImg } from "./dom.service.js";
import state from '../state/State.js';

function createSudokuGrid(empty = '', hidden = '') {

    function createSquareLine(squareId, i, k) {
        for (let j = 0; j < 3; j++) {
            const pointer = (9 * k) + (3 * i) + j;
            const cell = addDiv(state.cells[pointer].idText + empty, squareId, CELL_CSS.class);
            state.cells[pointer].html = cell;
        }
    }

    for (let i = 0; i < 9; i++) {
        const squareId = "Square-" + (i) + empty;
        addDiv(squareId, LAYOUT_ID.table, `Square` + hidden)

        if (i < 3) {
            for (let k = 0; k <= 2; k++) {
                createSquareLine(squareId, i, k);
            }
        } else if (i < 6) {
            for (let k = 2; k <= 4; k++) {
                createSquareLine(squareId, i, k);
            }
        } else if (i < 9) {
            for (let k = 4; k <= 6; k++) {
                createSquareLine(squareId, i, k);
            }
        }
    }

}

function createLayoutElements(parentElement, ...childElements) {
    childElements.forEach((element) => {
        addDiv(element, parentElement)
    });
}

function createNotesButton(){
    createButtonWithLabelAndImg(CONTROL_ID.notesButton, "round_buttons", "notes-div", "./images/pencil.png", "control_text", "Notes")
    createLayoutElements(CONTROL_ID.notesButton,"notesToggle");
    state.notesHtml = document.getElementById("notesButton");
    state.notesToggleHtml = document.getElementById("notesToggle");
}

function createRoundButtons() {

    createButtonWithLabelAndImg(CONTROL_ID.undoButton, "round_buttons", "undo-div", "./images/undo.png", "control_text", "Undo")
    createButtonWithLabelAndImg(CONTROL_ID.eraseButton, "round_buttons", "erase-div", "./images/eraser.png", "control_text", "Erase")
    createButtonWithLabelAndImg(CONTROL_ID.playOrPause, "play_pause", LAYOUT_ID.timerControl, "./images/pause.png")
    createNotesButton();

}

function createNumberButtons() {
    for (let i = 1; i <= 9; i++) {
        addButton("number-button-" + i, "number_buttons", "numbpad", i)
    }
}

export function createLayout() {
    createLayoutElements("app", LAYOUT_ID.timerControl);
    createLayoutElements(LAYOUT_ID.timerControl, LAYOUT_ID.timer)
    createLayoutElements("app", LAYOUT_ID.game);
    createLayoutElements("game", LAYOUT_ID.table, LAYOUT_ID.control);
    createLayoutElements("control", LAYOUT_ID.controlButtons, "numbpad");
    createLayoutElements(LAYOUT_ID.controlButtons, "undo-div", "erase-div", "notes-div");
    createRoundButtons();
    createNumberButtons();
    addButton("newGame", "newGame", "numbpad", "New Game");

    createSudokuGrid(`-empty`, ` hidden`);
    createSudokuGrid();
}
