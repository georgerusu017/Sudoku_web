
import { findColumnNeighbors, findLineNeighbors } from './functions.js';
import state from './state.js';

const cellClick = (event) => {

    state.reset();

    let iValue = event.target.id.split("-").pop();
    iValue = parseInt(iValue)

    state.target = iValue;
    state.cells[iValue].isSelected = true;

    state.highlight();
}

export function cellClickPress() {
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", cellClick);
    })
}

export function cellKeyPress() {
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            let pointer = 0;
            for (let i = 0; i < 81; i++) {
                if (state.cells[i].isSelected == true)
                    pointer = i;
            }
            const neighbors = findLineNeighbors(pointer);
            state.reset();

            if (pointer - 1 < neighbors[0]) {
                pointer += 8
            }
            else {
                pointer--;
            }

            state.target = pointer;
            state.cells[pointer].isSelected = true;
            state.highlight()
        }
        else if (event.key === "ArrowRight") {
            let pointer = 0;
            for (let i = 0; i < 81; i++) {
                if (state.cells[i].isSelected == true)
                    pointer = i;
            }
            const neighbors = findLineNeighbors(pointer);
            state.reset();

            if (pointer + 1 > neighbors.pop()) {
                pointer -= 8
            }
            else {
                pointer++;
            }

            state.target = pointer;
            state.cells[pointer].isSelected = true;
            state.highlight()
        }
        else if (event.key === "ArrowUp") {
            let pointer = 0;
            for (let i = 0; i < 81; i++) {
                if (state.cells[i].isSelected == true)
                    pointer = i;
            }
            state.reset();

            pointer -= 9;
            if (pointer < 0) {
                pointer += 81;
            }
            state.target = pointer;
            state.cells[pointer].isSelected = true;
            state.highlight()
        }
        else if (event.key === "ArrowDown") {
            let pointer = 0;
            for (let i = 0; i < 81; i++) {
                if (state.cells[i].isSelected == true)
                    pointer = i;
            }
            state.reset();
            pointer += 9;
            if (pointer > 80) {
                pointer -= 81;
            }
            state.target = pointer;
            state.cells[pointer].isSelected = true;
            state.highlight()
        }
    });
}

export function selectStartingCell() {
    state.cells[0].isSelected = true;
    state.target = 0;
    state.highlight()
}