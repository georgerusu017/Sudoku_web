
export class Cell {
    #id;
    #value;
    #isEditable;
    #isHighlighted;
    #isHighlightedSibling;
    #isSelected;
    #invalidCount;
    #html;
    #cellsNeighbors;

    constructor(id) {
        this.#id = id;
        this.#value = "0";
        this.#isEditable = true;
        this.#isHighlighted = false;
        this.#isHighlightedSibling = false;
        this.#isSelected = false;
        this.#html = null;
        this.#invalidCount = 0;
        this.#cellsNeighbors = null;
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

    get cellsNeighbors() {
        if (this.#cellsNeighbors == null) {
            this.#cellsNeighbors = new Set([
                ...this.findLineNeighbors(this.#id),
                ...this.findColumnNeighbors(this.#id),
                ...this.squareIndexes
            ])
            return this.#cellsNeighbors;
        }
        else return this.#cellsNeighbors;
    }

    set value(value) {
        this.#value = value;
        this.#html.innerHTML = value;
    }

    get isEditable() {
        return this.#isEditable;
    }

    set isEditable(value) {
        if (value) {
            this.#html.classList.add("isEditable")
        } else {
            this.#html.classList.remove("isEditable")
        }

        this.#isEditable = value;
    }

    get invalidCount() {
        return this.#invalidCount;
    }

    set invalidCount(value) {
        if (value > 0) {
            this.#html.classList.add("highlightInvalid")
        } else {
            this.#html.classList.remove("highlightInvalid")
        }

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

    get isHighlightedSibling() {
        return this.#isHighlightedSibling;
    }

    /**
     * @param {boolean}
     */
    set isHighlightedSibling(value) {

        if (value) {
            this.#html.classList.add("highlightTwin")
        } else {
            this.#html.classList.remove("highlightTwin")
        }

        this.#isHighlightedSibling = value;
    }

    get html() {
        return this.#html;
    }

    set html(value) {
        this.#html = value;
    }

    get squareCells() {
        const div = document.getElementById(this.idText);
        return [...div.parentNode.childNodes];
    }

    get squareIndexes() {
        const div = document.getElementById(this.idText);

        return [...div.parentNode.childNodes]
            .filter(cellHtml => cellHtml.id != this.idText)
            .map((cellHtml) => parseInt(cellHtml.id.split("-").pop()))
    }

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

    reset() {
        this.isSelected = false;
        this.isHighlighted = false;
        this.isHighlightedSibling = false;
    }

    wipe() {
        this.isHighlighted = false;
        this.isHighlightedSibling = false;
        this.isSelected = false;
        this.isEditable = true;
        this.invalidCount = 0;
        this.value = "";
    }
}
