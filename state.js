import { findColumnNeighbors, findLineNeighbors } from "./functions.js";

class Cell {
    #id;
    #value;
    #isEditable;
    #isHighlighted;
    #isSelected;
    #html;

    constructor(id) {
        this.#id = id;
        this.#value = "0";
        this.#isEditable = true;
        this.#isHighlighted = false;
        this.#isSelected = false;
        this.#html = null;
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

    // foloseste squareCells corect
    // scoatem target
    // trebuie inlocuit hilight prin control 


    /**
     * read about JSDOC
     * @type {Cell[]}
     */
    #cells = [];
    #target;

    constructor() {
        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.#cells.push(cell);
        }
    }

    getSelectedCellIndex() {
        let pointer = 0;
        for (let i = 0; i < 81; i++) {
            if (this.#cells[i].isSelected == true)
                pointer = i;
        }
        return pointer;
    }

    get cells() {
        return this.#cells;
    }

    set target(value) {
        this.#target = value;
    }

    setSelectedCell(cellId) {
        this.reset();
        const cellIndexToSelect = this.#cells.findIndex((cell) => cell.idText === cellId);
        this.#cells[cellIndexToSelect].isSelected = true;
        this.highlight(cellIndexToSelect);
    }

    highlight(selectedCellIndex) {
        const children = this.#cells[selectedCellIndex].squareCells;
        const lineValues = findLineNeighbors(selectedCellIndex);
        const columnValues = findColumnNeighbors(selectedCellIndex);
        let invalid = false;

        let childrenIds = children.map((cellHtml) => {
            const cellId = cellHtml.id.split("-").pop();
            return cellId;
        })

        childrenIds = childrenIds.filter(item => item != selectedCellIndex);
        childrenIds.forEach(id => {
            this.#cells[id].isHighlighted = true;
        })
        lineValues.forEach(id => {
            // if (this.#cells[id].value == this.#cells[selectedCellIndex].value && this.#cells[id].value != ""){
            //     console.log(this.#cells[id].value)
            //     console.log(this.#cells[selectedCellIndex].value)
            //     console.log(this.#cells[id].value == this.#cells[selectedCellIndex].value)
            //     invalid = true;
            //     this.#cells[id].html.classList.add("highlightInvalid")
            // }
            // else {
            //     this.#cells[id].html.classList.remove("highlightInvalid")
            // }
            this.#cells[id].isHighlighted = true;
        })
        columnValues.forEach(id => {
            this.#cells[id].isHighlighted = true;
        })
    }


    reset() {
        this.#cells.forEach(cell => {
            cell.isHighlighted = false;
            cell.isSelected = false;
            if (cell.isEditable == true){
                cell.html.classList.add("isEditable")
            }
            else {
                cell.html.classList.remove("isEditable")
            }
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