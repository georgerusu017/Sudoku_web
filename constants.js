
const CELL_CSS = Object.freeze({
    class: "cell",
    highlight: "highlight",
    highlightStrong: "highlightStrong"
})

const LAYOUT_ID = Object.freeze({
    game: "game",
    timer: "timer",
    table: "table",
    control: "control",
    controlButtons: "control-buttons",
    numpad: "numbpad"
})
const CONTROL_ID = {
    undoButton: "undoButton",
    eraseButton: "eraseButton",
    notesButton: "notesButton",
    undoLabel: "undoLabel",
    eraseLabel: "eraseLabel",
    notesLabel: "notesLabel",
    newGameButton: 'newGame',
    //
    numberButtons: []
    // [ ...Array(N).keys() ]
    // Array(N).fill().map((_, i) => i+1);
    // Array(10).fill().map((_, i) => i+1);
}

for (let i = 1; i < 10; i++) {
    CONTROL_ID.numberButtons.push(`number-button-${i}`)
}

const ARROW_KEY = Object.freeze({
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
})

export { CELL_CSS, LAYOUT_ID, CONTROL_ID, ARROW_KEY } 