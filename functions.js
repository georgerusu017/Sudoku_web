import { LAYOUT_ID, CELL_CSS, CONTROL_ID } from "./constants.js";
import { addDiv, addText, addButton, addImg } from "./domFunctions.js";
import state from './state.js';

function populateTable(puzzleValues) {
    const gridSize = 81;
    if (puzzleValues.length !== gridSize) {
        return `The array length must be ${gridSize}`;
    }

    for (let i = 0; i < gridSize; i++) {
        state.cells[i].value = puzzleValues[i] == "." ? "" : puzzleValues[i];

        if (state.cells[i].value != "") {
            state.cells[i].isEditable = false;
        }
        // TODO: integrate logic in cell state management
    }
}

function createSudokuGrid() {

    function createSquareLine(squareId, i, k, square) {
        for (let j = 0; j < 3; j++) {
            const pointer = (9 * k) + (3 * i) + j;
            const cell = addDiv(state.cells[pointer].idText, squareId, CELL_CSS.class);
            state.cells[pointer].html = cell;
            state.cells[pointer].squareHtml = square;
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
    // let smallerNum = num;
    // let largerNum = num;

    // if (num % 9 == 0){
    //     largeNum = num + 8;
    // }
    // else if (num % 9 == 8){
    //     smallNum = num - 8;
    // }
    // else{
    //     while (smallerNum % 9 !== 0) {
    //         smallerNum--;
    //     }

    //     while (largerNum % 9 !== 8) {
    //         largerNum++;
    //     }
    // }

    // const neighbors = [];

    // for (let i = smallerNum; i <= largerNum; i++) {
    //   neighbors.push(i);
    // }

    // return neighbors;

    let smallerNum = num;
    let largerNum = num;
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

    return neighbors;
}

function findColumnNeighbors(num) {
    let smallerNum = num;
    let largerNum = num;

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

    return neighbors;
}

function createRoundButtons() {
    addButton(CONTROL_ID.undoButton, "round_buttons", "undo-div", '')
    addButton(CONTROL_ID.eraseButton, "round_buttons", "erase-div", '')
    addButton(CONTROL_ID.notesButton, "round_buttons", "notes-div", '')

    addImg(CONTROL_ID.undoButton, "./images/undo.png")
    addImg(CONTROL_ID.eraseButton, "./images/eraser.png")
    addImg(CONTROL_ID.notesButton, "./images/pencil.png")

    // Adding round buttons labels
    addText("control_text", "undo-div", "Undo")
    addText("control_text", "erase-div", "Erase")
    addText("control_text", "notes-div", "Notes")
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

export {
    populateTable,
    createSudokuGrid,
    createLayout,
    findColumnNeighbors,
    findLineNeighbors,
    createControlBoard,
}