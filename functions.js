// Functions needed in the app

function addDiv(id, whereTo, className = null) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", id)
    if (className !== null) newDiv.setAttribute("class", className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}

function addText(className, whereTo, text) {
    const newDiv = document.createElement("label");
    const newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);
    newDiv.setAttribute("class", className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}

function addButton(id, className, whereTo, text) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", id);
    newButton.setAttribute("class", className);
    newButton.innerText = text;
    const app = document.getElementById(whereTo);
    app.appendChild(newButton);
}

function addImg(whereTo, source) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", source);
    newImg.setAttribute("width", "30px");
    newImg.setAttribute("height", "30px");
    const app = document.getElementById(whereTo);
    app.appendChild(newImg);
}

function populateTable(puzzleValues) {
    // works only if the populated location is named "cell-#" where # is a number
    const gridSize = 81;
    if (puzzleValues.length !== gridSize) {
        return `The array length must be ${gridSize}`;
    }
    for (i = 0; i < gridSize; i++) {
        CELLS[i].value = puzzleValues[i] == "." ? "" : puzzleValues[i];
        if (CELLS[i].value != "") {
            CELLS[i].isEditable = false;
        }
        const cell = document.getElementById(CELLS[i].idText);
        cell.appendChild((document.createTextNode(CELLS[i].value)))
    }
}

function createSudokuGrid() {
    function createSquareLine(squareId, i, k) {
        for (let j = 0; j < 3; j++) {
            const pointer = (9 * k) + (3 * i) + j;
            addDiv(CELLS[pointer].idText, squareId, CELLS[pointer].initialClass);
        }
    }

    for (let i = 0; i < 9; i++) {
        const squareId = "Square-" + (i);
        addDiv(squareId, LAYOUT_IDS.table, "Square")

        if (i < 3) {
            for (k = 0; k <= 2; k++) {
                createSquareLine(squareId, i, k);
            }
        } else if (i < 6) {
            for (k = 2; k <= 4; k++) {
                createSquareLine(squareId, i, k);
            }
        } else if (i < 9) {
            for (k = 4; k <= 6; k++) {
                createSquareLine(squareId, i, k);
            }
        }
    }
}

function createLayout(where,...args) {
    args.forEach((arg) => {
        addDiv(arg, where)
    });
}

function createButton(where,className,...args){
    args.forEach((arg) => {
        addButton(arg, where, className)
    });
}

function findLineNeighbors(num) {
    // let smallerNum = num;
    // let largerNum = num;

    // if (num % 9 == 0){
    //     largeNum = num + 8;
    // }
    // else if (num % 9 == 8){
    //     smallNum = num - 8;
    // }
    // else{
    //     while (smallerNum % 9 !== 0) {
    //         smallerNum--;
    //     }
      
    //     while (largerNum % 9 !== 8) {
    //         largerNum++;
    //     }
    // }

    // const neighbors = [];
  
    // for (let i = smallerNum; i <= largerNum; i++) {
    //   neighbors.push(i);
    // }

    // return neighbors;

    let smallerNum = num;
    let largerNum = num;
    if (num % 9 == 0){
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

    return neighbors;
}

function findColumnNeighbors(num) {
    let smallerNum = num;
    let largerNum = num;

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

    return neighbors;
}