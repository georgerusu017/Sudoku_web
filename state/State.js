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
        const childrenIndexes = this.cells[selectedCellIndex].squareIndexes;
        const lineCellIndexes = this.findLineNeighbors(selectedCellIndex);
        const columnCellIndexes = this.findColumnNeighbors(selectedCellIndex);

        const indexes = new Set([...lineCellIndexes, ...columnCellIndexes, ...childrenIndexes]);

        // console.log("vecini = ", this.cells[selectedCellIndex].cellsNeighbors);
        // console.log("vecini patrat = ", indexes)
        // console.log("selected Id = ", this.cells[selectedCellIndex].id)

        indexes.forEach(index => {
            this.cells[index].isHighlighted = true;
        })

        this.cells[selectedCellIndex].isHighlighted = true;
    }
    // AICI, PUNE IN CELL.JS, sa fie calculati toti vecinii
    // maybe move to CEll.js and precalculate neighbors in constructor, make methods private
    findLineNeighbors(num) {

        let smallerNum = num;
        let largerNum = num;
        let output = [];
        if (num % 9 == 0) {
            largerNum++;
        }
        else {
            smallerNum--;
        }

        while (smallerNum % 9 !== 0) {
            smallerNum--;
        }

        while (largerNum % 9 !== 8) {
            largerNum++;
        }

        const neighbors = [];

        for (let i = smallerNum; i <= largerNum; i++) {
            neighbors.push(i);
        }

        output = neighbors.filter(item => item != num)

        return output;
    }

    findColumnNeighbors(num) {
        let smallerNum = num;
        let largerNum = num;
        let output = [];

        while (smallerNum - 9 >= 0) {
            smallerNum -= 9;
        }

        while (largerNum + 9 <= 80) {
            largerNum += 9;
        }

        const neighbors = [];

        for (let i = smallerNum; i <= largerNum; i += 9) {
            neighbors.push(i);
        }

        output = neighbors.filter(item => item != num)

        return output;
    }
    //

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