// Work with modules

// create div
function addDiv(id,whereTo,className = null) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id",id)
    if (className !== null) newDiv.setAttribute("class",className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}

// create text
function addText(className,whereTo,text) {
    const newDiv = document.createElement("label");
    const newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);
    newDiv.setAttribute("class",className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}

// create button
function addButton(id,className,whereTo,text) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id",id);
    newButton.setAttribute("class",className);
    newButton.innerText = text;
    const app = document.getElementById(whereTo);
    app.appendChild(newButton);
}

// add img to buttons
function addImg(whereTo,source) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src",source);
    newImg.setAttribute("width","30px");
    newImg.setAttribute("height","30px");
    const app = document.getElementById(whereTo);
    app.appendChild(newImg);
}

function populateTable(arr){
    // works only if the populated location is named "cell-#" where # is a number

    if(arr.length !== 81) return "The array length must be 81";

    for(i = 0; i<81; i++){
        if(arr[i] == ".") addText("value",'cell-'+i,"")
        else addText("value",'cell-'+i,arr[i])
    }
}

function createTableContent(){
    for(let i=0; i<3; i++){
        addDiv("Square-"+(i),"table","Square")
        let k = 0;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
    }
    for(let i=3; i<6; i++){
        addDiv("Square-"+(i),"table","Square")
        let k = 2;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
    }
    for(let i=6; i<9; i++){
        addDiv("Square-"+(i),"table","Square")
        let k = 4;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
        k += 1;
        for(let j=0; j<3; j++){
            addDiv("cell-"+((9*k)+(3*i)+j),"Square-"+(i),"cell")
        }
    }
}

// Setting the layout
addDiv("timer","app")
addDiv("table","app")
addDiv("control","app")
addDiv("control-buttons","control")
addDiv("numbpad","control")

// Adding timer text
addText("text","timer","Timer: 12:34:56")

//WORKING ON CONTROL PANEL
// Adding round buttons
for(let i=1; i<=3; i++){
    addButton("round-"+i,"round_buttons","control-buttons","")
}

// Adding Round buttons to numpad
addImg("round-1","./images/undo.png")
addImg("round-2","./images/eraser.png")
addImg("round-3","./images/pencil.png")

// Adding round buttons labels
addText("control_text","control-buttons","Undo")
addText("control_text","control-buttons","Erase")
addText("control_text","control-buttons","Notes")


// Adding square buttons
for(let i=1; i<=9; i++){
    addButton("number-button-"+i,"number_buttons","numbpad",i)
}

addButton("newGame","newGame","numbpad","New Game")

createTableContent();

let sudokuUnsolved = sudoku.generate("medium");
let sudokuUnsolvedGrid = sudoku.board_string_to_grid(sudokuUnsolved);
const sudokuSolved = sudoku.solve(sudokuUnsolved);
const sudokuSolvedGrid = sudoku.board_string_to_grid(sudokuSolved);

populateTable(sudokuUnsolved)
