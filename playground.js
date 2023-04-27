// Work with modules

const LAYOUT_IDS = {
    timer: "timer",
    table: "table",
    control: "control",
    controlButtons: "control-buttons",
    numbpad: "numbpad"
}
const CONTROL_IDS = {
    undoButton: "undoButton",
    eraseButton: "eraseButton",
    notesButton: "notesButton",
    undoLabel: "undoLabel",
    eraseLabel: "eraseLabel",
    notesLabel: "notesLabel",
}
const CELL = {
    id: 0,
    value: 0,
    editable: true,
    isHighlighted: false,
    color: "blue"
}

// { value: 5, editable: false , color: lightblue, isHighlighted: true, }

createLayout("app",LAYOUT_IDS.timer,LAYOUT_IDS.table,LAYOUT_IDS.control)
createLayout("control", LAYOUT_IDS.controlButtons, "numbpad")

addText("text", "timer", "Timer: 12:34:56")

// trebuie o clasa pentru aceste div-ur
createLayout(LAYOUT_IDS.controlButtons,"undo-div","erase-div","notes-div")



// tohether \/
addButton(CONTROL_IDS.undoButton,"round_buttons","undo-div",'')
addButton(CONTROL_IDS.eraseButton,"round_buttons","erase-div",'')
addButton(CONTROL_IDS.notesButton,"round_buttons","notes-div",'')

addImg(CONTROL_IDS.undoButton, "./images/undo.png")
addImg(CONTROL_IDS.eraseButton, "./images/eraser.png")
addImg(CONTROL_IDS.notesButton, "./images/pencil.png")

// Adding round buttons labels
addText("control_text", "undo-div", "Undo")
addText("control_text", "erase-div", "Erase")
addText("control_text", "notes-div", "Notes")
// together /\

// Adding square buttons
for (let i = 1; i <= 9; i++) {
    addButton("number-button-" + i, "number_buttons", "numbpad", i)
}

addButton("newGame", "newGame", "numbpad", "New Game")

createSudokuGrid();

let sudokuUnsolved = sudoku.generate("medium");
let sudokuUnsolvedGrid = sudoku.board_string_to_grid(sudokuUnsolved);
const sudokuSolved = sudoku.solve(sudokuUnsolved);
const sudokuSolvedGrid = sudoku.board_string_to_grid(sudokuSolved);

populateTable(sudokuUnsolved)
