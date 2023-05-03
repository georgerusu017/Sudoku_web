
class StateManagerTest {

    #cells = [];
    #listeners = new Set();
    #stateCells = [];

    constructor() {
        class Cell {
            #id;
            #value;
            #isEditable;
            #isHighlighted;
            #isSelected;

            constructor(id) {
                this.#id = id;
                this.#value = "0";
                this.#isEditable = true;
                this.#isHighlighted = false;
                this.#isSelected = false;
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

            set isHighlighted(value) {
                this.#isHighlighted = value;
            }

            get isSelected() {
                return this.#isSelected;
            }

            set isSelected(value) {
                this.#isSelected = value;
            }
        }

        for (let i = 0; i < 81; i++) {
            const cell = new Cell(i);
            this.#cells.push(cell);
        }
        this.#listeners = new Set();
    }

    set stateCells(cells) {
        this.#stateCells = cells;
        this.notifyListeners();
    }

    get stateCells() {
        return this.#stateCells;
    }

    getCells() {
        return this.#cells;
    }

    reset() {
        for (const cell of this.#cells) {
            cell.isHighlighted = false;
            cell.isSelected = false;
        }
        this.notifyListeners();
    }

    addListener(listener) {
        this.#listeners.add(listener);
    }

    removeListener(listener) {
        this.#listeners.delete(listener);
    }

    notifyListeners() {
        for (const listener of this.#listeners) {
            listener();
        }
    }
}

const stateManagerTest = new StateManagerTest();
// get the cells array
const cells = stateManagerTest.getCells();