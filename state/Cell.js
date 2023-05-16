// import { SQUARES_IDS } from "../constants";

const SQUARES_IDS = [
    [0,1,2,9,10,11,18,19,20],
    [3,4,5,12,13,14,21,22,23],
    [6,7,8,15,16,17,24,25,26],
    [27,28,29,36,37,38,45,46,47],
    [30,31,32,39,40,41,48,49,50],
    [33,34,35,42,43,44,51,52,53],
    [54,55,56,63,64,65,72,73,74],
    [57,58,59,66,67,68,75,76,77],
    [60,61,62,69,70,71,78,79,80]
  ];

export class Cell {
    #id;
    #value;
    #isEditable;
    #isHighlighted;
    #isHighlightedSibling;
    #isSelected;
    #invalidCount;
    #html;
    #cellsNeighbors = [];

    constructor(id) {
        this.#id = id;
        this.#value = "0";
        this.#isEditable = true;
        this.#isHighlighted = false;
        this.#isHighlightedSibling = false;
        this.#isSelected = false;
        this.#html = null;
        this.#invalidCount = 0;
        this.#cellsNeighbors =
            new Set([...this.findLineNeighbors(this.#id),
            ...this.findColumnNeighbors(this.#id),
            ...this.findSquareNeighbors(this.#id)
            ]);
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
        // if cellNeighbors == null{
                // calculeaza
        // }

        // else return what i already return
        return this.#cellsNeighbors;
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

    findSquareNeighbors(id) {
        for (let j = 0; j <9; j++){
            if (SQUARES_IDS[j].includes(id)){
                return SQUARES_IDS[j].filter(item => item != id)
            }
        }
    }

    //     createSquareValues(i, k) {
    //         for (let j = 0; j < 3; j++) {
    //             const pointer = (9 * k) + (3 * i) + j;
    //         }
    //     }

    //     for (let i = 0; i < 9; i++) {

    //         if (i < 3) {
    //             for (let k = 0; k <= 2; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         } else if (i < 6) {
    //             for (let k = 2; k <= 4; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         } else if (i < 9) {
    //             for (let k = 4; k <= 6; k++) {
    //                 createSquareLine(squareId, i, k);
    //             }
    //         }
    //     }

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
