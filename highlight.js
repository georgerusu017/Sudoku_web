/// HIGHLIGHT ///

let cellsToSelect = [];

const cellSelected = (event) => {

    // clear selection
    for (let i = 0; i<81; i++){
        const cell = document.getElementById(`cell-${i}`);
        cell.setAttribute("class", "cell");
    }

    // select current cell
    event.target.setAttribute("class", "cell highlightStrong")

    // select cells from current square
    const parentDiv = event.target.parentNode;
    const childDivs = parentDiv.childNodes;
    childDivs.forEach(function(childDiv) {
        if (childDiv === event.target) {
            childDiv.setAttribute("class", "cell highlightStrong")
        } 
        else {
        childDiv.setAttribute("class", "cell highlight")
        }
    });

    // select cells from line
    let iValue = event.target.getAttribute("id");
    iValue = iValue.split("-").pop();
    iValue = parseInt(iValue);
    let lineValues = findLineNeighbors(iValue);
    lineValues = lineValues.filter(item => item != iValue);
    for (let i = 0; i<8; i++){
        const cell = document.getElementById(`cell-${lineValues[i]}`);
        cell.setAttribute("class", "cell highlight");
    }

    // sleect cells from column
    let columnValues = findColumnNeighbors(iValue);
    console.log("c = ",columnValues)
    columnValues = columnValues.filter(item => item != iValue);
    console.log("c filtered = ",columnValues)
    for (let i = 0; i<8; i++){
        const cell = document.getElementById(`cell-${columnValues[i]}`);
        cell.setAttribute("class", "cell highlight");
    }

}


for (let i = 0; i<81; i++){
    cellsToSelect[i] = document.getElementById(`cell-${i}`);
    cellsToSelect[i].addEventListener("click", cellSelected);
}
