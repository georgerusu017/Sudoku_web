
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
const CONTROL_ID = Object.freeze({
    undoButton: "undoButton",
    eraseButton: "eraseButton",
    notesButton: "notesButton",
    undoLabel: "undoLabel",
    eraseLabel: "eraseLabel",
    notesLabel: "notesLabel",
    newGameButton: 'newGame',
    numberButtons: [...Array(9).fill().map((_, i) => `number-button-${i+1}`)],

})

const ARROW_KEY = Object.freeze({
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
})

export { CELL_CSS, LAYOUT_ID, CONTROL_ID, ARROW_KEY } 