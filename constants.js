
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
    newGameButton: 'newGame',
    numberButtons: []
}

for (let i = 1; i < 10; i++) {
    CONTROL_ID.numberButtons.push(`number-button-${i}`)
}

export { CELL_CSS, LAYOUT_ID, CONTROL_ID } 