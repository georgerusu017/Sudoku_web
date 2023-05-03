/// HIGHLIGHT ///

/// MOMENTAN DEPINDE DE stateManagement.js !!! ///
import { findColumnNeighbors, findLineNeighbors } from './functions.js';
import { CELLS, STATE } from './stateManagement.js';
import state from './state.js';

let cellsToSelect = [];



const cellSelecting = (event) => {


    let iValue = event.target.getAttribute("id");
    iValue = iValue.split("-").pop();
    iValue = parseInt(iValue);

    // clear selection

    state.reset();

    // select current cell
    // event.target.setAttribute("class", "cell highlightStrong")

    
    // select cells from current square
    const parentDiv = event.target.parentNode;
    const childDivs = parentDiv.childNodes;
    
    childDivs.forEach(function (childDiv) {
        if (childDiv === event.target) {
            childDiv.classList.add("highlightStrong")
            CELLS[iValue].isSelected = true;
        }
        else {
            childDiv.classList.add("highlight")
        }
    });

    // select cells from line

    let lineValues = findLineNeighbors(iValue);
    lineValues = lineValues.filter(item => item != iValue);
    for (let i = 0; i < 8; i++) {
        const cell = document.getElementById(CELLS[lineValues[i]].idText);
        cell.classList.add("highlight");
    }


    // sleect cells from column
    let columnValues = findColumnNeighbors(iValue);
    columnValues = columnValues.filter(item => item != iValue);
    for (let i = 0; i < 8; i++) {
        const cell = document.getElementById(CELLS[columnValues[i]].idText);
        cell.classList.add("highlight");
    }

}


// add click event as function
for (let i = 0; i < 81; i++) {
    cellsToSelect[i] = document.getElementById(CELLS[i].idText);
    cellsToSelect[i].addEventListener("click", cellSelecting);
}
