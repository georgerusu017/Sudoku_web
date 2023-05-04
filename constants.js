
const CELL_CSS = {
    class: "cell",
    hilglight: "highlight",
    hilightStrong: "hilightStrong"
}

const LAYOUT_ID = {
    game: "game",
    timer: "timer",
    table: "table",
    control: "control",
    controlButtons: "control-buttons",
    numbpad: "numbpad"
}
const CONTROL_ID = {
    undoButton: "undoButton",
    eraseButton: "eraseButton",
    notesButton: "notesButton",
    undoLabel: "undoLabel",
    eraseLabel: "eraseLabel",
    notesLabel: "notesLabel",
}

const SUDOKU_UNSOLVED = sudoku.generate("medium");
const SUDOKU_SOLVED = sudoku.solve(SUDOKU_UNSOLVED);

export { CELL_CSS, LAYOUT_ID, CONTROL_ID, SUDOKU_SOLVED, SUDOKU_UNSOLVED } 