import { Cell } from "./Cell.js";

class StateManager {
    /**
     * @type {Cell[]}
     */
    cells = [];
    #isNotesEnabled = false;
    #isNotesEnabled;
    #history = [];

    constructor() {
        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.cells.push(cell);
        }
    }


    addToHistory(selectedCell) {
        this.#history.push({
            cell: selectedCell,
            value: selectedCell.value,
            id: selectedCell.id,
            // valorile lui notesHtml
            notesHtml: selectedCell.notesHtml,
            notesValuesToggle: selectedCell.notesValuesToggle
        })
    }

    addHistoryRecordToCell() {
        const INDEX = this.#history.length - 1;
        const CELL = this.#history[INDEX]

        this.cells[CELL.id].value = CELL.value
        // this.cells[CELL.cell.id].notesHtml = CELL.cell.notesHtml

    }
    undo() {
        if (this.#history.length > 1) {
            this.#history.pop();
            const ITEM = this.#history[this.#history.length - 1]
            const INDEX = ITEM[0];
            const CELL = ITEM[1];
            console.log("cells[index] = ", this.cells[INDEX])
        }
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
        return this.#isNotesEnabled
    }

    set notesToggleHtml(value) {
        this.#isNotesEnabled = value;
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
        this.addToHistory(this.cells[0]);
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