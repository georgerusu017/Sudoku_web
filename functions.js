import { LAYOUT_ID, CELL_CSS, CONTROL_ID } from "./constants.js";
import { addDiv, addText, addButton, addImg } from "./domFunctions.js";
import state from './state.js';

function populateTable(puzzleValues) {
    const gridSize = 81;
    state.boardWipe();

    if (puzzleValues.length !== gridSize) {
        return `The array length must be ${gridSize}`;
    }

    for (let i = 0; i < gridSize; i++) {

        if (puzzleValues[i] == "."){
            state.cells[i].value = "";
            state.cells[i].html.classList.add("isEditable")
        }
        else {
            state.cells[i].value = puzzleValues[i];
            state.cells[i].isEditable = false;
        }

    }
}

function createSudokuGrid() {

    function createSquareLine(squareId, i, k, square) {
        for (let j = 0; j < 3; j++) {
            const pointer = (9 * k) + (3 * i) + j;
            const cell = addDiv(state.cells[pointer].idText, squareId, CELL_CSS.class);
            state.cells[pointer].html = cell;
        }
    }

    for (let i = 0; i < 9; i++) {
        const squareId = "Square-" + (i);
        const square = addDiv(squareId, LAYOUT_ID.table, "Square")

        if (i < 3) {
            for (let k = 0; k <= 2; k++) {
                createSquareLine(squareId, i, k, square);
            }
        } else if (i < 6) {
            for (let k = 2; k <= 4; k++) {
                createSquareLine(squareId, i, k, square);
            }
        } else if (i < 9) {
            for (let k = 4; k <= 6; k++) {
                createSquareLine(squareId, i, k, square);
            }
        }
    }
}

function createLayout(where, ...args) {
    args.forEach((arg) => {
        addDiv(arg, where)
    });
}

function findLineNeighbors(num) {

    let smallerNum = num;
    let largerNum = num;
    let output = [];
    if (num % 9 == 0) {
        largerNum++;
    }
    else {
        smallerNum--;
    }

    while (smallerNum % 9 !== 0) {
        smallerNum--;
    }

    while (largerNum % 9 !== 8) {
        largerNum++;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i++) {
        neighbors.push(i);
    }

    output = neighbors.filter(item => item != num)

    return output;
}

function findColumnNeighbors(num) {
    let smallerNum = num;
    let largerNum = num;
    let output = [];

    while (smallerNum - 9 >= 0) {
        smallerNum -= 9;
    }

    while (largerNum + 9 <= 80) {
        largerNum += 9;
    }

    const neighbors = [];

    for (let i = smallerNum; i <= largerNum; i += 9) {
        neighbors.push(i);
    }

    output = neighbors.filter(item => item != num)

    return output;
}

function createButtonWithLabelAndImg(id,className,whereTo,imgFrom,labelClass,labelText){
    addButton(id, className, whereTo, '')
    addImg(id, imgFrom)
    addText(labelClass, whereTo, labelText)
}

function createRoundButtons() {

    createButtonWithLabelAndImg(CONTROL_ID.undoButton, "round_buttons", "undo-div", "./images/undo.png", "control_text", "Undo")
    createButtonWithLabelAndImg(CONTROL_ID.eraseButton, "round_buttons", "erase-div", "./images/eraser.png", "control_text", "Erase")
    createButtonWithLabelAndImg(CONTROL_ID.notesButton, "round_buttons", "notes-div", "./images/pencil.png", "control_text", "Notes")

}

function createNumberButtons(){
    for (let i = 1; i <= 9; i++) {
        addButton("number-button-" + i, "number_buttons", "numbpad", i)
    }
}

function createControlBoard() {
    createLayout("app", LAYOUT_ID.timer)
    createLayout("app",LAYOUT_ID.game)
    createLayout("game", LAYOUT_ID.table, LAYOUT_ID.control)
    createLayout("control", LAYOUT_ID.controlButtons, "numbpad")
    createLayout(LAYOUT_ID.controlButtons, "undo-div", "erase-div", "notes-div")
    createRoundButtons();
    createNumberButtons();
    addButton("newGame", "newGame", "numbpad", "New Game")
    addText("timer", LAYOUT_ID.timer, "Timer: 12:34:56")
}

function checkingHighlight(cells, indexTest){
    cells[indexTest].isHighlighted = true;
        if (cells[indexTest].invalidCount > 0){
            cells[indexTest].html.classList.add("highlightInvalid")
            if (cells[indexTest].isEditable)  {
                cells[indexTest].html.classList.add("invalidValue")
            }
        }
        else {
            cells[indexTest].html.classList.remove("highlightInvalid")
            if (cells[indexTest].isEditable)  {
                cells[indexTest].html.classList.remove("invalidValue")
            }
        }
}

export {
    populateTable,
    createSudokuGrid,
    createLayout,
    findColumnNeighbors,
    findLineNeighbors,
    createControlBoard,
    checkingHighlight
}