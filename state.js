import { findColumnNeighbors, findLineNeighbors } from "./functions.js";

class Cell {
    #id;
    #value;
    #isEditable;
    #isHighlighted;
    #isSelected;
    #invalidCount;
    #html;

    constructor(id) {
        this.#id = id;
        this.#value = "0";
        this.#isEditable = true;
        this.#isHighlighted = false;
        this.#isSelected = false;
        this.#html = null;
        this.#invalidCount = 0;
    }

    get idText() {
        return `cell-${this.id}`;
    }

    get id() {
        return this.#id;
    }

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.#html.innerHTML = value;
    }

    get isEditable() {
        return this.#isEditable;
    }

    set isEditable(value) {
        this.#isEditable = value;
    }

    get invalidCount() {
        return this.#invalidCount;
    }

    set invalidCount(value) {
        this.#invalidCount = value;
    }

    get isHighlighted() {
        return this.#isHighlighted;
    }

    /**
     * @param {boolean}
     */
    set isHighlighted(value) {

        if (value) {
            this.#html.classList.add("highlight")
        } else {
            this.#html.classList.remove("highlight")
        }

        this.#isHighlighted = value;
    }

    get isSelected() {
        return this.#isSelected;
    }

    /**
     * @param {boolean}
     */
    set isSelected(value) {
        if (value) {
            this.#html.classList.add("highlightStrong")
        } else {
            this.#html.classList.remove("highlightStrong")
        }

        this.#isSelected = value;
    }

    get html() {
        return document.getElementById(this.idText)
    }

    set html(value) {
        this.#html = value;
    }

    get squareCells() {
        const div = document.getElementById(this.idText);
        return [...div.parentNode.childNodes];
    }
}


class StateManager {
    /**
     * read about JSDOC
     * @type {Cell[]}
     */
    #cells = [];

    constructor() {
        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.#cells.push(cell);
        }
    }

    getSelectedCellIndex() {
        let pointer = 0;

        // find index in loc de for
        for (let i = 0; i < 81; i++) {
            if (this.#cells[i].isSelected)
                pointer = i;
        }
        return pointer;
    }
        // find index

    get cells() {
        return this.#cells;
    }

    setSelectedCell(cellId) {
        this.reset();
        const cellIndexToSelect = this.#cells.findIndex((cell) => cell.idText === cellId);
        this.#cells[cellIndexToSelect].isSelected = true;
        this.highlight(cellIndexToSelect);
    }

    highlight(selectedCellIndex) {
        const children = this.#cells[selectedCellIndex].squareCells;
        const lineCellIndexes = findLineNeighbors(selectedCellIndex);
        const columnCellIndexes = findColumnNeighbors(selectedCellIndex);

        let childrenIndexes = children.map((cellHtml) => {
            const cellId = cellHtml.id.split("-").pop();
            return cellId;
        })

        childrenIndexes = childrenIndexes.filter(index => index != selectedCellIndex);

        childrenIndexes.forEach(index => {
            // 
            this.#cells[index].isHighlighted = true;

        })
        lineCellIndexes.forEach(index => {
            // Se repeta

            this.#cells[index].isHighlighted = true;
        })
        columnCellIndexes.forEach(index => {
            // Se repeta

            this.#cells[index].isHighlighted = true;
        })
    }


    reset() {
        this.#cells.forEach(cell => {
            cell.isHighlighted = false;
            cell.isSelected = false;
            // verifica daca mai facea ceva si da-i foc
            // if (cell.isEditable) {
            //     cell.html.classList.add("isEditable")
            // }
            // else {
            //     cell.html.classList.remove("isEditable")
            // }
        })
    }

    boardWipe() {
        this.#cells.forEach(cell => {
            cell.isHighlighted = false;
            cell.isSelected = false;
            cell.isEditable = true;
        })
    }
}

export default new StateManager();