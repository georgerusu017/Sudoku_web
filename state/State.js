import { Cell } from "./Cell.js";

class StateManager {
    /**
     * @type {Cell[]}
     */
    cells = [];

    constructor() {
        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.cells.push(cell);
        }
    }

    get cells() {
        return this.cells;
    }

    startNewGame() {
        const sudokuPuzzle = sudoku.generate("insane");
        //const sudokuPuzzleSolved = sudoku.solve(SUDOKU_UNSOLVED);

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

        this.setSelectedCell(this.cells[0].idText);
    }

    getSelectedCellIndex() {
        return this.cells.findIndex((element) => element.isSelected)
    }

    setSelectedCell(cellId) {
        this.#reset();
        const cellIndexToSelect = this.cells.findIndex((cell) => cell.idText === cellId);

        this.cells[cellIndexToSelect].isSelected = true;

        if (this.cells[cellIndexToSelect].value != "") {
            this.cells.forEach(cell => {
                if (cell.value == this.cells[cellIndexToSelect].value) {
                    cell.isHighlightedSibling = true;
                }
            })
        }

        this.highlight(cellIndexToSelect);
    }

    highlight(selectedCellIndex) {
        this.cells[selectedCellIndex].cellsNeighbors
            .forEach(index => {
                this.cells[index].isHighlighted = true;
            })

        this.cells[selectedCellIndex].isHighlighted = true;
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
    }
}

export default new StateManager();