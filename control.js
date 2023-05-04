
import { findColumnNeighbors, findLineNeighbors } from './functions.js';
import state from './state.js';

const cellSelecting = (event) => {

    state.reset();

    let iValue = event.target.getAttribute("id");
    iValue = iValue.split("-").pop();
    iValue = parseInt(iValue);

    const square = state.cells[iValue].squareHtml
    square.forEach(cell => {
        const id = cell.id.split("-").pop()
        state.cells[id].isHighlighted = true;
    })  
    state.cells[iValue].isSelected = true;

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

export function cellControl (){
    state.cells.forEach(cell => {
        cell.html.addEventListener("click", cellSelecting);
    })
}
