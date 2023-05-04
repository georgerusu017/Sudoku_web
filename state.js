
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


class StateManagerTest {

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

    get cells() {
        return this.#cells;
    }

    reset() {
        this.#cells.forEach(cell => {
            cell.isHighlighted = false;
            cell.isSelected = false;
        })
    }
}

export default new StateManagerTest();