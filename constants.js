
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

const SQUARES_IDS = [
  [0,1,2,9,10,11,18,19,20],
  [3,4,5,12,13,14,21,22,23],
  [6,7,8,15,16,17,24,25,26],
  [27,28,29,36,37,38,45,46,47],
  [30,31,32,39,40,41,48,49,50],
  [33,34,35,42,43,44,51,52,53],
  [54,55,56,63,64,65,72,73,74],
  [57,58,59,66,67,68,75,76,77],
  [60,61,62,69,70,71,78,79,80]
];

for (let i = 1; i < 10; i++) {
    CONTROL_ID.numberButtons.push(`number-button-${i}`)
}

const ARROW_KEY = Object.freeze({
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
})

export { CELL_CSS, LAYOUT_ID, CONTROL_ID, ARROW_KEY, SQUARES_IDS } 