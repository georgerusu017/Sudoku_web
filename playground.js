// create div
function addDiv(id,whereTo,classid = 0) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id",id)
    newDiv.setAttribute("class",classid)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}
// create text
function addText(classid,whereTo,text) {
    const newDiv = document.createElement("label");
    const newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);
    newDiv.setAttribute("class",classid)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}
// create button
function addButton(id,classid,whereTo,text) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id",id)
    newButton.setAttribute("class",classid)
    newButton.innerText = text;
    const app = document.getElementById(whereTo);
    app.appendChild(newButton);
}

// add img to buttons
function addImg(whereTo,source,color) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src",source)
    newImg.setAttribute("color",color)
    newImg.setAttribute("width","30px")
    newImg.setAttribute("height","30px")
    const app = document.getElementById(whereTo);
    app.appendChild(newImg);
    // app.appendChild(newImg);
}

// add svg to buttons
// function addSvg(id,xmlns,classid,whereTo) {
//     const newSvg = document.createElement("svg");
//     newSvg.setAttribute("id",id);
//     newSvg.setAttribute("xmlns",xmlns);
//     newSvg.setAttribute("class",classid);
//     const app = document.getElementById(whereTo);
//     app.appendChild(newSvg);

    // setting path
    // const newPath = document.createElement("path");
    // newPath.setAttribute("fill",color);
    // newPath.setAttribute("d",d)
    // const app2 = document.getElementById("id",id);
    // app2.appendChild(newPath);
// }

// Setting the layout
addDiv("timer","app")
addDiv("table","app")
addDiv("control","app")

// Adding timer text
addText("text","timer","Timer: 12:34:56")


//WORKING ON CONTROL PANEL
// Adding round buttons
for(let i=1; i<=3; i++){
    addButton("round-"+i,"round_buttons","control","")
}

// addindg svgs to round buttons
// const undo_button = document.getElementById("round-1");
// undo_button.setAttribute("svg",)
// const erase_button = document.getElementById("round-2");
// const notes_button = document.getElementById("round-3");
addImg("round-1","./images/undo.png","#0072e3")


// Adding round buttons labels
addText("control_text","control","Undo")
addText("control_text","control","Erase")
addText("control_text","control","Notes")
// addButton("round_buttons","control")
// addButton("round_buttons","control")
// addButton("round_buttons","control")


// Adding square buttons
for(let i=1; i<=9; i++){
    addButton("square-"+i,"number_buttons","control",i)
}

addButton("newGame","newGame","control","New Game")


// WORKING ON TABLE

// Adding squares to the table
for(let j=0; j<=8; j++){
    addDiv("bigSquare-"+(j+1),"table","bigSquare")
    for (let i=1; i<=9; i++){
        addDiv("square-"+((9*j)+i),"bigSquare-"+(j+1),"square")
    }
}