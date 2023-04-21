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
    newButton.setAttribute("id",id)
    newButton.setAttribute("class",className)
    newButton.innerText = text;
    const app = document.getElementById(whereTo);
    app.appendChild(newButton);
}

// add img to buttons
function addImg(whereTo,source) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src",source)
    newImg.setAttribute("width","30px")
    newImg.setAttribute("height","30px")
    const app = document.getElementById(whereTo);
    app.appendChild(newImg);
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

// Almost working
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


// WORKING ON TABLE


// square is now cell
// Adding squares to the table
for(let j=1; j<=9; j++){
    addDiv("bigSquare-"+(j),"table","bigSquare")
    for (let i=1; i<=9; i++){
        addDiv("cell-"+((9*(j-1))+i),"bigSquare-"+(j),"cell")
    }
}
