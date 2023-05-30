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
        clockId: null,
        timerDiv: null,
    };


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

    #startTimer() {
        this.#timer.timerDiv.innerHTML = `Timer: 00:00`;
        clearInterval(this.#timer.clockId)
        this.#timer.minutes = 0;
        this.#timer.seconds = 0;
        this.#initTimer();
    }

    #initTimer() {
        this.#timer.clockId = setInterval(() => {
            let minutes = null
            let seconds = null
            this.#timer.seconds++;

            if (this.#timer.seconds == 60) {
                this.#timer.minutes++
                this.#timer.seconds = 0;
            }
            if (this.#timer.minutes == 60) {
                clearInterval(this.#timer.clockId)
                return window.alert("You Lost");
            }

            if (this.#timer.minutes < 10) {
                minutes = `0${this.#timer.minutes}`
            } else {
                minutes = this.#timer.minutes
            }

            if (this.#timer.seconds < 10) {
                seconds = `0${this.#timer.seconds}`
            } else {
                seconds = this.#timer.seconds
            }

            this.#timer.timerDiv.innerHTML = `Timer: ${minutes}` + `:` + `${seconds}`
            console.log(`timer: `, this.#timer.minutes, this.#timer.seconds)

        }, 1000)
    }

    toggleTimer() {
        if (this.#timer.clockId) {
            clearInterval(this.#timer.clockId)
            this.#timer.clockId = null;
            // console.log("celulele = ", this.cells)
            for (let i = 0; i < 9; i++) {
                document.getElementById(`Square-${i}`).classList.add(`hidden`)
                document.getElementById(`Square-${i}-empty`).classList.remove(`hidden`)
            }
        } else {
            this.#initTimer();
            for (let i = 0; i < 9; i++) {
                document.getElementById(`Square-${i}`).classList.remove(`hidden`)
                document.getElementById(`Square-${i}-empty`).classList.add(`hidden`)
            }
        }
    }

    resumeTimer() {
        if (this.timer.clockId == null) {
            this.toggleTimer()
            return true
        }
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

        this.timer.timerDiv = document.getElementById(LAYOUT_ID.timer);
        this.setSelectedCell(this.cells[0]);
        this.#startTimer()
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