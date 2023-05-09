export function addDiv(id, whereTo, className = null) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", id)
    if (className !== null) newDiv.setAttribute("class", className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
    return newDiv;
}

export function addText(className, whereTo, text) {
    const newDiv = document.createElement("label");
    const newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);
    newDiv.setAttribute("class", className)
    const app = document.getElementById(whereTo);
    app.appendChild(newDiv);
}

export function addButton(id, className, whereTo, text) {
    const newButton = document.createElement("button");
    newButton.setAttribute("id", id);
    newButton.setAttribute("class", className);
    newButton.innerText = text;
    const app = document.getElementById(whereTo);
    app.appendChild(newButton);
}

export function addImg(whereTo, source) {
    const newImg = document.createElement("img");
    newImg.setAttribute("src", source);
    newImg.setAttribute("width", "30px");
    newImg.setAttribute("height", "30px");
    const app = document.getElementById(whereTo);
    app.appendChild(newImg);
}