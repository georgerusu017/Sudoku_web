/// HIGHLIGHT ///

import { findColumnNeighbors, findLineNeighbors } from './functions.js';
import state from './state.js';

const cellSelecting = (event) => {


    let iValue = event.target.getAttribute("id");
    iValue = iValue.split("-").pop();
    iValue = parseInt(iValue);
    // clear selection

    state.reset();


    // FUNCTIONEAZA {

    // const parentDiv = event.target.parentNode;
    // const childDivs = parentDiv.childNodes;
    
    // childDivs.forEach(function (childDiv) {
    //     if (childDiv === event.target) {
    //         childDiv.classList.add("highlightStrong")
    //         state.cells[iValue].isSelected = true;
    //     }
    //     else {
    //         childDiv.classList.add("highlight")
    //     }
    // });

    // }


    const square = state.cells[iValue].squareHtml
    square.forEach(cell => {
        if (cell == event.target){
            cell.isSelected = true;
        }
        else {
            cell.isHighlighted = true;
        }
        console.log("cell =", cell)
    })  
    // log-uri diferite

    console.log("state = ", state.cells[iValue])



    // select cells from line
    let lineValues = findLineNeighbors(iValue);
    lineValues = lineValues.filter(item => item != iValue);
    for (let i = 0; i < 8; i++) {
        const pointer = lineValues[i];
        state.cells[pointer].isHighlighted = true;
    }

    // sleect cells from column
    let columnValues = findColumnNeighbors(iValue);
    columnValues = columnValues.filter(item => item != iValue);
    for (let i = 0; i < 8; i++) {
        const pointer = columnValues[i];
        state.cells[pointer].isHighlighted = true;
    }
}

state.cells.forEach(cell => {
    cell.html.addEventListener("click", cellSelecting);
})