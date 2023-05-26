import { Cell } from "./Cell.js";

class StateManager {
    /**
     * @type {Cell[]}
     */
    cells = [];
    #isNotesEnabled = false;
    #notesToggleHtml;
    #history = [];

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
            notesValues : [...selectedCell.notesValues]
        })
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