import { findColumnNeighbors, findLineNeighbors } from "./functions.js";

class Cell {
    #id;
    #value;
    #isEditable;
    #isHighlighted;
    #isSelected;
    #html;
    #squareHtml;

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
    
    get html(){
        return document.getElementById(this.idText)
    }

    set html(value) {
        this.#html = value;
    }

    get squareHtml(){
        const div = document.getElementById(this.idText);
        return div.parentNode.childNodes;
    }

    set squareHtml(value) {
        this.#squareHtml = value;
    }
}


class StateManager {

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


    get cells() {
        return this.#cells;
    }

    set target(value) {
        this.#target = value;
    }

    highlight(){
        const pointer = parseInt(this.#target);
        const childs = this.#cells[pointer].squareHtml;
        const lineValues = findLineNeighbors(pointer).filter(item => item != pointer);
        const columnValues = findColumnNeighbors(pointer).filter(item => item != pointer);
        const test = findColumnNeighbors(pointer)

        let childsIds = new Array;
        childs.forEach(cell => {
            cell = cell.id.split("-").pop();
            childsIds.push(cell)
        })
        childsIds = childsIds.filter(item => item != pointer);
        childsIds.forEach(id =>{
            this.#cells[id].isHighlighted = true;
        })
        lineValues.forEach(id => {
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
        })
    }
}

export default new StateManager();