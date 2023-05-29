import { Cell } from "./Cell.js";
import { LAYOUT_ID } from "../constants.js";

class StateManager {
    /**
     * @type {Cell[]}
     */
    cells = [];
    #isNotesEnabled = false;
    #notesToggleHtml;
    #history = [];
    #timer = {
        seconds: 0,
        minutes: 0,
        html: document.getElementById(LAYOUT_ID.timer)
    }

    constructor() {
        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.cells.push(cell);
        }
    }

    addToHistory(selectedCell) {
        this.#history.push({
            value: selectedCell.value,
            id: selectedCell.id,
            notesValues: [...selectedCell.notesValues]
        })
    }

    startTimer() {
        let clock = null
        let minutes = null
        let seconds = null
        let timerDiv = document.getElementById(LAYOUT_ID.timer)

        clock = setInterval(() => {
            if(this.#timer.minutes < 10){
                minutes = `0${this.#timer.minutes}`
            } else{
                minutes = this.#timer.minutes
            }

            if(this.#timer.seconds < 10){
                seconds = `0${this.#timer.seconds}`
            } else{
                seconds = this.#timer.seconds
            }

            timerDiv.innerHTML = `Timer: ${minutes}`+`:`+`${seconds}`

            this.#timer.seconds++;
            if (this.#timer.seconds == 60) {
                this.#timer.minutes++
                this.#timer.seconds = 0;
            }
            if (this.#timer.minutes == 60) {
                clear()
                return window.alert("You Lost");
            }

            console.log(`timer: `, this.#timer.minutes, this.#timer.seconds)
        }, 1000)

        function clear() {
            clearInterval(clock)
        }

    }

    resetTimer() {
        this.#timer.minutes = 0;
        this.#timer.seconds = 0;
    }

    get timer() {
        return this.#timer;
    }

    get history() {
        return this.#history;
    }

    get cells() {
        return this.cells;
    }

    get isNotesEnabled() {
        return this.#isNotesEnabled;
    }

    /**
     * @param {boolean} value
     */
    set isNotesEnabled(value) {
        if (value) {
            this.notesHtml.classList.add("round_buttons_selected")
            this.notesToggleHtml.innerHTML = "ON"
            this.notesToggleHtml.classList.add("notes_toggle_selected")

        } else {
            this.notesHtml.classList.remove("round_buttons_selected")
            this.notesToggleHtml.innerHTML = "OFF"
            this.notesToggleHtml.classList.remove("notes_toggle_selected")
        }
        this.#isNotesEnabled = value;
    }

    get notesToggleHtml() {
        return this.#notesToggleHtml
    }

    set notesToggleHtml(value) {
        this.#notesToggleHtml = value;
        this.notesToggleHtml.innerHTML = "OFF"
    }

    startNewGame() {
        const sudokuPuzzle = sudoku.generate("insane");
        // const sudokuPuzzleSolved = sudoku.solve(SUDOKU_UNSOLVED);

        const gridSize = 81;
        this.#boardWipe();

        for (let i = 0; i < gridSize; i++) {
            if (sudokuPuzzle[i] == ".") {
                this.cells[i].value = "";
            }
            else {
                this.cells[i].value = sudokuPuzzle[i];
                this.cells[i].isEditable = false;
            }
        }

        this.setSelectedCell(this.cells[0]);
        // this.resetTimer();
        this.startTimer()
    }

    getSelectedCellIndex() {
        return this.cells.findIndex((element) => element.isSelected)
    }

    setSelectedCell(cell) {
        this.#reset();
        cell.isSelected = true;
        this.#highlight(cell);
    }

    #highlight(cell) {
        cell.cellsNeighbors
            .forEach(index => {
                this.cells[index].isHighlighted = true;
            })

        if (cell.value != "") {
            this.cells.forEach(element => {
                if (element.value == cell.value) {
                    element.isHighlightedSibling = true;
                }
            })
        }

        cell.isHighlighted = true;
    }

    #reset() {
        this.cells.forEach(cell => {
            cell.reset()
        })
    }

    #boardWipe() {
        this.cells.forEach(cell => {
            cell.wipe();
        })
        this.isNotesEnabled = false;
    }
}

export default new StateManager();